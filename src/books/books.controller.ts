import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { BookQuery, BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import Book from './book.entity';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role as RoleEnum } from '../roles/role.enum';
import { BookDto } from './book.dto';
import { CategoriesService } from '../categorys/categories.service';
import { PublishersService } from '../publishers/publishers.service';



@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService,private readonly categoriesService: CategoriesService,private readonly publishersService: PublishersService) {}
  
  @Get()
  async getBooks( @Query() query: BookQuery){
    const bookList = await this.booksService.find(query)
    return {
      data: bookList,
    }
  }
  
  @Get(':id')
  async getBook( @Param('id') id: number){
    return await this.booksService.findOne(id)
  }
  
  @Roles(RoleEnum.Admin)
  @Post()
  async addBooks( @Body() body: BookDto){
    const {categories,publisher,...book} = body
    const categoryEntityList =  await this.categoriesService.find(categories)
    const publisherEntity = await this.publishersService.find([publisher])
    const bookEntity = new Book({...book,categories:categoryEntityList,publisher:publisherEntity[0]})
    return this.booksService.creates([bookEntity])
  }
  
  @Roles(RoleEnum.Admin)
  @Patch(':id')
  async updateBooks( @Param('id') id: number, @Body() body: BookDto){
    const {categories,publisher,...book} = body
    const categoryEntityList =  await this.categoriesService.find(categories)
    const publisherEntity = await this.publishersService.find([publisher])
    const bookEntity = new Book({...book,categories:categoryEntityList,publisher:publisherEntity[0]})
    return this.booksService.update(id,bookEntity)
  
  }
  
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async deleteBooks( @Param('id') id: number){
    return await this.booksService.delete(id)
  }
}
