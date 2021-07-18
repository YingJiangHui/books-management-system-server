import {User} from '../entity/user.entity'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 导入实体
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
}