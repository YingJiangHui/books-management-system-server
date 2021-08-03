import { Controller,Get,Query } from '@nestjs/common';
import { StatisticsService,TimeQuantum,TimeUnit } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService : StatisticsService) {}
  @Get("gather")
  async getStatistics(){
    return {
      category: await this.statisticsService.getTopTenCategory(),
      book: await this.statisticsService.getTopTenBorrowedBook(),
      status: await this.statisticsService.getStatusStatistics(),
      reader: await this.statisticsService.getTopTenActiveReader(),
    }
  }
  
  @Get('time')
  async getStatisticsByTime(@Query('timeUnit') timeUnit:TimeUnit,@Query('timeQuantum') timeQuantum:TimeQuantum){
    return this.statisticsService.getStatisticsByTime(timeUnit,timeQuantum)
  }
}
