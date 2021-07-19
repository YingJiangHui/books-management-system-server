import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }
  
  find(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(username:string):Promise<User|undefined>{
    // select user2.id ,user2.username,user2.email,role.name from public.user as user2,role,user_roles_role  where user2.username='user' AND role.id = "roleId" AND user2.id = "userId";
    return this.usersRepository.findOne({username});
  }
  async createOne(user: User): Promise<User> {
    await this.usersRepository.create(user)
    return this.usersRepository.save(user);
  }
}
