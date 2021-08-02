import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService : StatisticsService) {}
  @Get()
  async getStatistics(){
    return {
      category: await this.statisticsService.getTopTenCategory(),
      book: await this.statisticsService.getTopTenBorrowedBook(),
      status: await this.statisticsService.getStatusStatistics(),
      reader: await this.statisticsService.getTopTenActiveReader()
    }
  }
}
