import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { BorrowBooksService } from './borrow-books.service';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { BooksService } from '../books/books.service';
import {Request} from 'express'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { User } from '../users/user.entity';
import { BorrowBook } from './entities/borrow-book.entity';
import Book from '../books/book.entity';
export type BorrowBookQuery = {
  userId?:number,
  bookId?:number,
}

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('borrow-books')
export class BorrowBooksController {
  constructor(private readonly borrowBooksService: BorrowBooksService,private readonly booksService: BooksService) {}
  @Post()
  async create(@Req() req:Request,@Body() createBorrowBookDto: CreateBorrowBookDto) {
    const {bookId,...borrowBookField} = createBorrowBookDto
    const book = await this.booksService.findOne(bookId)
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowBooksService.remove(+id);
  }
}
