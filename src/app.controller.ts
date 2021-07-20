import { Controller, Get, Post,Req,Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';
import { RolesGuard } from './roles/roles.guard';

// 下面是两种 Passport 策略,护照本地策略和护照 jwt 策略
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard) // 不受保护的本地守卫，LocalStrategy.validate -> AuthService.validateUser -> AppController.login -> authService.login
  @Post('auth/login')
  async login(@Req() req) {
    const token = await this.authService.login(req.user)
    // Passport 将基于 validate() 方法的返回值构建一个user 对象，并将其作为属性附加到请求对象上。
    return token;
  }
  
  @UseGuards(JwtAuthGuard,RolesGuard) // 测试代码，受jwt保护的jwt守卫
  @Roles(Role.User)
  @Get('profile')
  getProfile(@Res() req) {
    return req.user;
  }
}
