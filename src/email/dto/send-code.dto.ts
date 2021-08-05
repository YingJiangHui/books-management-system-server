import { IsEmail} from 'class-validator';

export class SendCodeDto {
  @IsEmail({},{message:()=>"你需要使用一个正确的邮箱"})
  email: string;
}
