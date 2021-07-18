import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NationsService } from '../service/nations.service';
import { NationsController } from '../controller/nations.controller';
import { Nation } from '../entity/nation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nation])], // 导入实体
  controllers: [NationsController],
  providers: [NationsService],
})
export class NationsModule {
}