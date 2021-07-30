import { Injectable } from '@nestjs/common';
import Category from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
  }
  
  findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }
  
  find(idList?: number[]) {
    if (idList)
      return this.categoryRepository.find({
        where: idList?.map((id) => ({ id }))
      });
    else
      return this.categoryRepository.find();
  }
  
  create(category: Category) {
    return this.categoryRepository.create(category);
  }
}
