import { Controller, Get } from '@nestjs/common';
import { NationsService } from './nations.service';
import { Nation } from './nation.entity';

@Controller('nation')
export class NationsController{
  constructor(private readonly userService: NationsService) {}
  
  @Get('list')
  async getNationList(): Promise<Nation[]> {
    return this.userService.find();
  }
}
