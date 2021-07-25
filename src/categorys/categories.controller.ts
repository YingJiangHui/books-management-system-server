import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  
  @Get()
  getCategories() {
    return this.categoriesService.find()
  }
  
  @Get(':id')
  getCategory(@Param('id') id:number) {
    return this.categoriesService.findOne(id)
  }
  
}
