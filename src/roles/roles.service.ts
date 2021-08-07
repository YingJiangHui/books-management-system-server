import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) {
  }
  
  findOne({name}: { name:string }): Promise<Role> {
    return this.rolesRepository.findOne({name});
  }
}
