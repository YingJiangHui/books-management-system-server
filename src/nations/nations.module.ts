import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NationsService } from './nations.service';
import { NationsController } from './nations.controller';
import { Nation } from './nation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nation])], // 导入实体
  controllers: [NationsController],
  providers: [NationsService],
})
export class NationsModule {
}