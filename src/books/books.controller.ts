import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BookQuery, BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import Book from './book.entity';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role as RoleEnum } from '../roles/role.enum';



@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  
  @Get()
  async getBooks( @Query() query: BookQuery){
    const bookList = await this.booksService.find(query)
    return {
      content: bookList,
    }
  }
  
  @Get(':id')
  async getBook( @Param('id') id: number){
    return await this.booksService.findOne(id)
  }
  
  @Roles(RoleEnum.Admin)
  @Post()
  async addBooks( @Body() body: Book[]){
    return await this.booksService.creates(body)
  }
  
  @Roles(RoleEnum.Admin)
  @Patch(':id')
  async updateBooks( @Param('id') id: number, @Body() body: Book){
    return await this.booksService.update(id, body)
  }
  
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async deleteBooks( @Param('id') id: number){
    return await this.booksService.delete(id)
  }
}
