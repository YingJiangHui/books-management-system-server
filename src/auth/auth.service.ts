import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt  from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService:UsersService,
    private readonly jwtService: JwtService
  ) {}
  
  async validateUser(username:string,password:string):Promise<Partial<User>|null>{
    const user = await this.usersService.findOne(username);
    if(user){
      const match = user.comparePass((pass)=>bcrypt.compareSync(password, pass))
      if (match) {
        // const { passwordDigest, ...result } = user;
        return user;
      }
    }
    return null;
  }
  
  async login(user: User) {
    const payload = { username: user.username, sub: user.id ,roles:user.roles.map((role)=>role.name),nation:user.nation,email:user.email,createdAt:user.createdAt};
    return {
      access_token: this.jwtService.sign(payload), // 用于从用户对象属性的子集生成 jwt
    };
  }
}
