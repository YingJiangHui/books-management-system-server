import { IsEmail,IsNotEmpty } from 'class-validator';

export class CreateUserDto{
  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword:string;
  
  @IsEmail()
  email:string;
  
  @IsNotEmpty()
  nationId: number;
}