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
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { User } from '../users/user.entity';
import { BorrowBook } from './entities/borrow-book.entity';
import { QueryBorrowBookDto } from './dto/query-borrow-book.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('borrow-books')
export class BorrowBooksController {
  constructor(private readonly borrowBooksService: BorrowBooksService, private readonly booksService: BooksService) {
  }
  
  async checkCanBorrow(@Param('id') bookId: string, query: { endDate: string, startedDate: string, userId: number }) {
    const { endDate, startedDate, userId } = query;
    const isOtherUserBorrowed = await this.borrowBooksService.checkIsOtherUserBorrowed({ bookId: +bookId, startedDate, endDate, status: ['RESERVED', 'BORROWED', 'APPLIED', 'RENEWAL'], userId });
    if (isOtherUserBorrowed)
      throw new InternalServerErrorException('该时间段已经有其他用户借阅');
    
    const isAlreadyBorrowed = await this.borrowBooksService.checkIsAlreadyBorrowed({ bookId: +bookId, status: ['RESERVED', 'APPLIED'], userId });
    if (isAlreadyBorrowed)
      throw new InternalServerErrorException('不可重复借阅');
    
    const refuseBooks = await this.borrowBooksService.findAll({ bookId: +bookId, status: ['LOST'] });
    if (refuseBooks.length > 0)
      throw new InternalServerErrorException('图书遗失无法借阅');
    
    
  }
  
  @Post()
  async create(@Req() req: Request, @Body() createBorrowBookDto: CreateBorrowBookDto) {
    const { bookId, ...borrowBookField } = createBorrowBookDto;
    await this.checkCanBorrow(bookId, { startedDate: borrowBookField.startedDate, endDate: borrowBookField.endDate, userId: req.user['id'] });
    const book = await this.booksService.findOne(+bookId);
    const user = new User(req.user);
    const borrowBook = new BorrowBook({ ...borrowBookField, book, user });
    return this.borrowBooksService.create(borrowBook);
  }
  
  @Get('user')
  findUser(@Req() req: Request, @Query() query: QueryBorrowBookDto) {
    return this.borrowBooksService.findAll({ ...query, userId: req.user['id'] });
  }
  
  @Get()
  findAll(@Req() req: Request, @Query() query: QueryBorrowBookDto) {
    return this.borrowBooksService.findAll({ ...query });
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowBooksService.findOne(+id);
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBorrowBookDto: UpdateBorrowBookDto, @Req() req: Request) {
    const { startedDate, endDate, status } = updateBorrowBookDto;
    const borrowBook = await this.borrowBooksService.findOne(+id);
    if (['APPLIED', 'RENEWAL'].indexOf(status) !== -1) {
      await this.checkCanBorrow(borrowBook.book.id.toString(), { startedDate, endDate, userId: req.user['id'] });
    }
    return this.borrowBooksService.update(+id, updateBorrowBookDto);
  }
  
  @Get(':id/occupied-time')
  async getOccupiedTimeList(@Param('id') id: string) {
    const borrowedBooks = await this.borrowBooksService.findAll({ bookId: +id, status: ['RESERVED', 'BORROWED', 'APPLIED', 'RENEWAL'] });
    return borrowedBooks.map(({ startedDate, endDate }) => ({ startedDate, endDate }));
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const borrowBook = await this.borrowBooksService.findOne(+id);
    if (borrowBook.status === 'RESERVED')
      return this.borrowBooksService.remove(+id);
    throw new InternalServerErrorException('本次借阅未完成');
  }

}
