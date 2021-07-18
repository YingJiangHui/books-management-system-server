import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService:UsersService) {}
  async validateUser(username:string,password:string):Promise<Partial<User>|null>{
    const user = await this.usersService.findOne(username);
    const match = bcrypt.compareSync(password, user.passwordDigest);
    if (match) {
      const { passwordDigest, ...result } = user;
      return result;
    }
    return null;
  }
}
