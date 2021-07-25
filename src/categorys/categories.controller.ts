import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly booksService: BooksService) {}
  
  @Get()
  getCategories() {
    return this.booksService.find()
  }
  
  @Get(':id')
  getCategory(@Param('id') id:number) {
    return this.booksService.findOne(id)
  }
  
}
