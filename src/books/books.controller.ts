import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BookQueryParam, BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import Book from './book.entity';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role as RoleEnum } from '../roles/role.enum';



@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  
  @Get('list')
  async getBooks( @Query() params: BookQueryParam){
    const [bookList,count] = await this.booksService.find(params)
    return {
      content: bookList,
      total:count
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
