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
  
  async createOne(user: User): Promise<User> {
    await this.usersRepository.create(user)
    return this.usersRepository.save(user);
  }
}
