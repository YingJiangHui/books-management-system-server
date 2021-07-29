import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Book from './book.entity';
import { Brackets, Connection, Repository } from 'typeorm';

export type BookQuery = Partial<{ searchText,categoryId:number,bookId:number,publisherId:number }& Common.pagination>

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>,private readonly connection: Connection) {
  }
  
  find(query?:BookQuery) {
    const { searchText, categoryId } = query;
    return this.booksRepository.createQueryBuilder('book')
      .innerJoinAndSelect('book.publisher','publisher')
      .innerJoinAndSelect('book.categories','category')
      .where('category.name LIKE :categoryName AND book.name LIKE :bookName AND publisher.name LIKE :publisherName',{categoryName:`%${searchText?searchText:''}%`,bookName:`%${searchText?searchText:''}%`,publisherName:`%${searchText?searchText:''}%`})
      .andWhere(new Brackets((qb)=>{
        if(categoryId)
          qb.where('category.id = :id ',{id:Number(categoryId)})
        else
          qb.where('category.id>=0')
      }))
      .select([
      "book.id",
      "book.name",
      "book.description",
      "category.name",
      "publisher.name",
    ])
      .getRawMany()
  }
  
  findOne(id: number) {
    return this.booksRepository.findOne(id)
  }
  
  creates(book: Book[]) {
    // return this.booksRepository.create(book); create 是通过一个对象来创建一条数据库记录
    return this.booksRepository.save(book); // save 是通过一个实例来创建一条记录
  }
  
  delete(id: number) {
    return this.booksRepository.delete({id});
  }
  
  update(id:number,book: Book) {
    return this.booksRepository.update({ id }, book);
  }
}
