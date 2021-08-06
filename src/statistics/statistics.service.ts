import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

export type TimeUnit = 'month' | 'day'
export type TimeQuantum = [string, string]

@Injectable()
export class StatisticsService {
  constructor(private readonly connection: Connection) {
  }
  
  async getStatusStatistics() {
    return this.connection.query(`SELECT status ,count(*) as n FROM borrow_book GROUP BY status ORDER BY n DESC`);
  }
  
  async getTopTenBorrowedBook() {
    return this.connection.query(`SELECT  book.name,"bookId" ,count(*) as n FROM borrow_book ,book where "bookId" = book.id GROUP BY "bookId",book.name ORDER BY n DESC LIMIT 10`);
  }
  
  async getTopTenCategory() {
    return this.connection.query(`SELECT category.id,category.name,count(*) as n FROM borrow_book ,book,book_categories_category,category where borrow_book."bookId" = book.id AND book.id = book_categories_category."bookId" AND  book_categories_category."categoryId" = category."id" GROUP BY category.name,category.id ORDER BY n DESC LIMIT 10`);
  }
  
  async getTopTenActiveReader() {
    return this.connection.query(`SELECT u."username" as name,"userId" ,count(*) as n FROM borrow_book, public.user as u where "userId" = u.id GROUP BY "userId",u."username" ORDER BY n DESC LIMIT 10`);
  }
  
  async getStatisticsByTime(timeUnit: TimeUnit, timeQuantum: TimeQuantum = ['2021-01-01', '2021-12-31']) {
    const formatDate = {
      day: 'DD',
      month: 'MM'
    };
    return await this.connection.query(`select borrow_book.status,to_char(borrow_book."startedDate", '${formatDate[timeUnit]}') as time ,
                                              count(id)
                                              from  borrow_book
                                              where borrow_book."startedDate" between '${timeQuantum[0]}' and  '${timeQuantum[1]}'
                                              group by time ,status`);
  }
}
