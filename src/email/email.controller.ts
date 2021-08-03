import { BadRequestException, Body, Controller, Post, Session } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  
  @Post('/sendCode')
  async sendEmailCode(@Body() data,@Session() session: Record<string, any>) {
    const code = Math.random()
      .toString()
      .slice(-6);
    session.code = code
    return this.emailService.sendEmailCode(data,code);
  }
  
  @Post('/validateCode')
  async validateEmailCode(@Body() data,@Session() session: Record<string, any>) {
    if(data.code!==session.code){
      throw new BadRequestException([{ field: 'code',subErrors: ['验证码错误'] }])
    }
    return true;
  }
}