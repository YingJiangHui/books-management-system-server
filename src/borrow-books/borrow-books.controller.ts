import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  InternalServerErrorException
} from '@nestjs/common';
import { BorrowBooksService } from './borrow-books.service';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { BooksService } from '../books/books.service';
import {Request} from 'express'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { User } from '../users/user.entity';
import { BorrowBook, BorrowBookStatus } from './entities/borrow-book.entity';

export type BorrowBookQuery = {
  userId?:number,
  bookId?:number,
  status?: BorrowBookStatus
}

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('borrow-books')
export class BorrowBooksController {
  constructor(private readonly borrowBooksService: BorrowBooksService,private readonly booksService: BooksService) {}
  @Post()
  async create(@Req() req:Request,@Body() createBorrowBookDto: CreateBorrowBookDto) {
    const {bookId,...borrowBookField} = createBorrowBookDto
    const occupiedTimeList = await  this.getCanBorrowTime(bookId)
  
    const can = occupiedTimeList.filter((occupiedTime)=>{
      const occupiedEndTime = Date.parse(occupiedTime.endDate)
      const occupiedStartTime = Date.parse(occupiedTime.startedDate)
      const endTime = Date.parse(borrowBookField.endDate)
      const startTime = Date.parse(borrowBookField.startedDate)
      return (occupiedStartTime < startTime && startTime < occupiedEndTime) || (occupiedStartTime < endTime && endTime < occupiedEndTime);
    }).length===0
    if(!can)
      throw new InternalServerErrorException('该时间段已经被其他用户借阅')
    
    const book = await this.booksService.findOne(+bookId)
    const user = new User(req.user)
    const borrowBook = new BorrowBook({...borrowBookField,book,user})
    return this.borrowBooksService.create(borrowBook);
  }
  
  @Get('self')
  findSelf(@Req() req:Request,@Query() query: BorrowBookQuery) {
    return this.borrowBooksService.findAll({...query,userId:req.user['id']});
  }
  
  @Get()
  findAll(@Req() req:Request,@Query() query: BorrowBookQuery) {
    return this.borrowBooksService.findAll({...query});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowBooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBorrowBookDto: UpdateBorrowBookDto) {
    return this.borrowBooksService.update(+id, updateBorrowBookDto);
  }
  
  @Get(':id/time')
  async getCanBorrowTime(@Param('id') id: string) {
    const borrowBooks = await this.borrowBooksService.findAll({bookId:+id})
    const borrowedBooks = borrowBooks.filter((borrowBooks)=>borrowBooks.status!=='RESERVED')
    return borrowedBooks.map(({startedDate,endDate})=>({ startedDate, endDate }))
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const borrowBook = await this.borrowBooksService.findOne(+id)
    if(borrowBook.status==='RESERVED')
      return this.borrowBooksService.remove(+id);
    throw new InternalServerErrorException('本次借阅未完成')
  }
  
  
}
