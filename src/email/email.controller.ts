import { BadRequestException, Body, Controller, Post, Req, Session, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendCodeDto } from './dto/send-code.dto';
import {Request} from 'express'

@Controller('email')
// @UseGuards(JwtAuthGuard,RolesGuard)
export class EmailController {
  constructor(private emailService: EmailService) {}
  
  @Post('/sendCode')
  async sendEmailCode(@Body() data:SendCodeDto,@Session() session: Record<string, any>,@Req() request: Request) {
    console.log(request.user,data)
    if(request.user&&!request.user?.['email'])
      throw new BadRequestException([{ field: 'email',subErrors: ['该账号未绑定邮箱'] }])
    if(request.user&&request.user?.['email'] !== data.email)
      throw new BadRequestException([{ field: 'email',subErrors: ['这不是该账号的邮箱'] }])
    const code = Math.random()
      .toString()
      .slice(-6);
    session.code = code
    return this.emailService.sendEmailCode(data,code);
  }
  
  // @Roles(RoleEnum.User,RoleEnum.Admin)
  @Post('/validateCode')
  async validateEmailCode(@Body() data,@Session() session: Record<string, any>) {
    if(data.code!==session.code){
      throw new BadRequestException([{ field: 'code',subErrors: ['验证码错误'] }])
    }
    return true;
  }
}