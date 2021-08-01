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
import { BorrowBook } from './entities/borrow-book.entity';
import { QueryBorrowBookDto } from './dto/query-borrow-book.dto';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('borrow-books')
export class BorrowBooksController {
  constructor(private readonly borrowBooksService: BorrowBooksService,private readonly booksService: BooksService) {}
  @Post()
  async create(@Req() req:Request,@Body() createBorrowBookDto: CreateBorrowBookDto) {
    const {bookId,...borrowBookField} = createBorrowBookDto
    const occupiedTimeList = await  this.getOccupiedTimeList(bookId)
  
    const can = occupiedTimeList.filter((occupiedTime)=>{
      const occupiedEndTime = Date.parse(occupiedTime.endDate)
      const occupiedStartTime = Date.parse(occupiedTime.startedDate)
      const endTime = Date.parse(borrowBookField.endDate)
      const startTime = Date.parse(borrowBookField.startedDate)
      return startTime<=occupiedEndTime && endTime>= occupiedStartTime;
    }).length===0
  
    const refuseBooks = await this.borrowBooksService.findAll({bookId:+bookId,status:['LOST']})
    
    if(refuseBooks.length>0)
      throw new InternalServerErrorException('图书遗失无法借阅')
    
    if(!can)
      throw new InternalServerErrorException('该时间段已经有用户借阅')
    
    const book = await this.booksService.findOne(+bookId)
    const user = new User(req.user)
    const borrowBook = new BorrowBook({...borrowBookField,book,user})
    return this.borrowBooksService.create(borrowBook);
  }
  
  @Get('user')
  findUser(@Req() req:Request,@Query() query: QueryBorrowBookDto) {
    return this.borrowBooksService.findAll({...query,userId:req.user['id']});
  }
  
  @Get()
  findAll(@Req() req:Request,@Query() query: QueryBorrowBookDto) {
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
  
  @Get(':id/occupied-time')
  async getOccupiedTimeList(@Param('id') id: string) {
    const borrowedBooks = await this.borrowBooksService.findAll({bookId:+id,status:['RESERVED','BORROWED','APPLIED']})
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
