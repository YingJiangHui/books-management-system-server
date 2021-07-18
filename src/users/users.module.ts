import {User} from './user.entity'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 导入实体
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
}