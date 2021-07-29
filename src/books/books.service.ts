import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Book from './book.entity';
import { Brackets, Connection, Repository } from 'typeorm';

export type BookQuery = Partial<{ author:string,categories:string,name:string,publisher:string }&Common.Pagination>

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>,private readonly connection: Connection) {
  }
  
  find(query?:BookQuery) {
    const { author,categories,name,publisher } = query;
    return this.booksRepository.createQueryBuilder('book')
      .innerJoinAndSelect('book.publisher','publisher')
      .innerJoinAndSelect('book.categories','category')
      .where('category.name LIKE :categoryName AND book.name LIKE :bookName AND publisher.name LIKE :publisherName AND book.author LIKE  :authorName',
      {categoryName:`%${categories?categories:''}%`,bookName:`%${name?name:''}%`,publisherName:`%${publisher?publisher:''}%`,authorName:`%${author?author:''}%`})
      // .andWhere(new Brackets((qb)=>{
      //   if(categoryId)
      //     qb.where('category.id = :id ',{id:Number(categoryId)})
      //   else
      //     qb.where('category.id>=0')
      // }))
      .getMany()
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
    return this.booksRepository.query(`UPDATE book`)
  }
}
