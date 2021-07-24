import { IsEmail,IsNotEmpty } from 'class-validator';

export class CreateUserDto{
  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword:string;
  
  @IsEmail({},{message:()=>"你需要使用一个正确的邮箱"})
  email:string;
  
  @IsNotEmpty()
  nationId: number;
}