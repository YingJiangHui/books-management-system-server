import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Book from './book.entity';
import { ILike, Repository } from 'typeorm';

export type BookQueryParam = Partial<{ categoryName: string, publisherName: string, bookName: string, paging:Common.Paging }>

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) {
  }
  
  find(query?:BookQueryParam) {
    const { categoryName = '', publisherName = '', bookName = '', paging} = query;
    return this.booksRepository.findAndCount({ //使用聚合查询，记录数量
      where: [
        {
          name: ILike(`%${bookName} #%`),
          categories: {
            name: ILike(`%${categoryName} #%`)
          },
          publisher: {
            name: ILike(`%${publisherName} #%`)
          }
        }
      ],
      relations: ['categories', 'publisher'],
      ...paging,
    });
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
