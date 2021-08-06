import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Book from './book.entity';
import { Brackets, Connection, Repository } from 'typeorm';
import Category from '../categorys/category.entity';

export type BookQuery = Partial<{ author: string, categories: string, name: string, publisher: string, id: string, description: string, searchText: string } & Common.Pagination>

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>, private readonly connection: Connection) {
  }
  
  find(query?: BookQuery) {
    const { searchText } = query;
    let { author, categories, name, publisher, description } = query;
    const { id } = query;
    return this.booksRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.publisher', 'publisher')
      .leftJoinAndSelect('book.categories', 'category')
      .where(new Brackets((qb) => {
        if (searchText) {
          author = categories = name = publisher = description = searchText;
          qb.where('category.name LIKE :categoryName ',
            { categoryName: `%${categories ? categories : ''}%` })
            .orWhere(`book.name LIKE :bookName`,
              { bookName: `%${name ? name : ''}%` })
            .orWhere(`publisher.name LIKE :publisherName `,
              { publisherName: `%${publisher ? publisher : ''}%` })
            .orWhere(`book.author LIKE  :authorName`,
              { authorName: `%${author ? author : ''}%` })
            .orWhere(` book.description LIKE :description`,
              { description: `%${description ? description : ''}%` });
        } else {
          qb.where('category.name LIKE :categoryName ',
            { categoryName: `%${categories ? categories : ''}%` })
            .andWhere(`book.name LIKE :bookName`,
              { bookName: `%${name ? name : ''}%` })
            .andWhere(`publisher.name LIKE :publisherName `,
              { publisherName: `%${publisher ? publisher : ''}%` })
            .andWhere(`book.author LIKE  :authorName`,
              { authorName: `%${author ? author : ''}%` })
            .andWhere(` book.description LIKE :description`,
              { description: `%${description ? description : ''}%` });
          if (id) {
            qb.andWhere('book.id = :bookId', { bookId: +id });
          }
        }
      }))
      .orderBy('book.id', 'DESC')
      .getMany();
  }
  
  findOne(id: number) {
    return this.booksRepository.findOne(id, { relations: ['categories', 'publisher'] });
  }
  
  creates(book: Book[]) {
    // return this.booksRepository.create(book); create 是通过一个对象来创建一条数据库记录
    return this.booksRepository.save(book); // save 是通过一个实例来创建一条记录
  }
  
  async delete(id: number) {
    return this.booksRepository.delete(id);
  }
  
  async deleteCategories(id: number) {
    return this.connection.query(`DELETE FROM book_categories_category WHERE "bookId"=${id}`);
  }
  
  async createCategories(id: number, categories: Category[]) {
    return this.connection.query(`INSERT INTO book_categories_category("bookId","categoryId")  values ${categories.map((category) => `(${id},${category.id})`).join(',')}`);
  }
  
  async updateCategories(id: number, categories: Category[]) {
    await this.deleteCategories(id);
    await this.createCategories(id, categories);
  }
  
  async update(id: number, book: Book) {
    const { categories, ...bookField } = book;
    await this.updateCategories(id, categories);
    await this.booksRepository.update({ id }, bookField);
  }
}
