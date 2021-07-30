import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Publisher from './publisher.entity';

@Injectable()
export class PublishersService {
  constructor(@InjectRepository(Publisher) private publisherRepository: Repository<Publisher>) {}
  
  findOne(id:number){
    return this.publisherRepository.findOne(id);
  }
  
  find(idList?:number[]){
    if(idList){
      return this.publisherRepository.find({
        where:idList.map((id)=>({id}))
      })
    }else{
      return this.publisherRepository.find();
    }
  }
  
  create(publisher:Publisher){
    return this.publisherRepository.create(publisher);
  }
}
