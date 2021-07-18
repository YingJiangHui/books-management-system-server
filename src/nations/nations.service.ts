import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nation } from './nation.entity';


@Injectable()
export class NationsService {
  constructor(@InjectRepository(Nation) private nationsRepository: Repository<Nation>) {
  }
  
  find(): Promise<Nation[]> {
    return this.nationsRepository.find();
  }
}
