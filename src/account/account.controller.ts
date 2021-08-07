import { BadRequestException, Body, Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { NationsService } from '../nations/nations.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role as RoleEnum} from '../roles/role.enum';
import { CreateUserDto } from '../users/create.user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Role } from '../roles/role.entity';
import { RolesService } from '../roles/roles.service';

@Controller('account')
export class AccountController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService, private readonly nationsService: NationsService, private readonly rolesService: RolesService) {
  }
  
  @UseGuards(LocalAuthGuard) // 不受保护的本地守卫，LocalStrategy.validate -> AuthService.validateUser -> AppController.login -> authService.login
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('jwt', token);
    // Passport 将基于 validate() 方法的返回值构建一个user 对象，并将其作为属性附加到请求对象上。
    return token;
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard) // 测试代码，受jwt保护的jwt守卫
  @Roles(RoleEnum.User)
  @Get('user')
  getUser(@Req() req) {
    return req.user;
  }
  
  @Post('sign')
  async signUp(@Body() data: CreateUserDto,@Session() session: Record<string, any>) {
    const userInDatabase = await this.usersService.findOne(data.username);
    const nation = await this.nationsService.findOne(data.nationId);
    const role = await this.rolesService.findOne({name:'reader'})
    const user = new User({ username: data.username, password: data.password, confirmPassword: data.confirmPassword, email: data.email, nation,roles:[role] });
    if(data.code!==session.code){
      user.addError({ field: 'code',subErrors: ['验证码错误'] })
    }
    if (userInDatabase)
      user.addError({ field: 'username', subErrors: ['用户名已存在'] });
    if (!nation) {
      user.addError({ field: 'nationId', subErrors: ['未找到该民族'] });
    }
    
    if (user.errors.length)
      throw new BadRequestException(user.errors);
    
    
    return this.usersService.createOne(user);
    
  }
  
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
  }
  

}
