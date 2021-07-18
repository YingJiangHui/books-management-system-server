import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @Get('currentUser') // 路径 api/users/currentUser 与 下面定义的方法名无关
  async getCurrentUser(): Promise<User[]> {
    
    return this.userService.find();
  }
  
  @Post('currentUser')
  createUser(@Body() user:User){
    return this.userService.createOne(user)
  }
}
