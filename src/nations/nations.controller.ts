import { Controller, Get } from '@nestjs/common';
import { NationsService } from './nations.service';
import { Nation } from './nation.entity';

@Controller('nations')
export class NationsController{
  constructor(private readonly userService: NationsService) {}
  
  @Get()
  async getNations(): Promise<Nation[]> {
    return this.userService.find();
  }
}
