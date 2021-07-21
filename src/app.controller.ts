import { BadRequestException,Body,Controller,Get,Post,Req,Res,UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';
import { RolesGuard } from './roles/roles.guard';
import {Response} from 'express'
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/create.user.dto';
import { NationsService } from './nations/nations.service';

// 下面是两种 Passport 策略,护照本地策略和护照 jwt 策略
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,private readonly usersService:UsersService,private readonly nationsService:NationsService) {}
  
  @UseGuards(LocalAuthGuard) // 不受保护的本地守卫，LocalStrategy.validate -> AuthService.validateUser -> AppController.login -> authService.login
  @Post('auth/login')
  async login(@Req() req,@Res({ passthrough: true }) res:Response) {
    const token = await this.authService.login(req.user)
    res.cookie('jwt', token)
    // Passport 将基于 validate() 方法的返回值构建一个user 对象，并将其作为属性附加到请求对象上。
    return token;
  }
  
  @UseGuards(JwtAuthGuard,RolesGuard) // 测试代码，受jwt保护的jwt守卫
  @Roles(Role.User)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
  
  @Post('account/sign')
  
  async sign(@Body() data:CreateUserDto) {
    // const u = new User(user)
    const userInDatabase = await this.usersService.findOne(data.username)
    
    const nation= await this.nationsService.findOne(data.nationId)
    const user = new User({username:data.username,password:data.password,confirmPassword:data.confirmPassword,email:data.email,nation})
    if(userInDatabase)
      user.addError({field:'username',subErrors:['用户名已存在']})
    if(!nation){
      user.addError({field:'nationId',subErrors:['未找到该民族']})
    }
    
    if(user.errors.length)
      throw new  BadRequestException(user.errors)
    
    return this.usersService.createOne(user)
  }
}
