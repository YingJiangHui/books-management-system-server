import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard) // 测试代码，受jwt保护的jwt守卫
  @Get('currentUser') // 路径 api/users/currentUser 与 下面定义的方法名无关
  @Post('currentUser')
  async getCurrentUser(@Req() req): Promise<User> {
    return req.user;
  }
}
