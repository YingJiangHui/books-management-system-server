import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PublishersService } from './publishers.service';

@UseGuards(JwtAuthGuard)
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}
  
  @Get()
  getCategories() {
    return this.publishersService.find()
  }
  
  @Get(':id')
  getCategory(@Param('id') id:number) {
    return this.publishersService.findOne(id)
  }
}
