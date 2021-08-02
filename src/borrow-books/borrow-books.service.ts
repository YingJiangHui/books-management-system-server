import { Injectable } from '@nestjs/common';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { BorrowBook } from './entities/borrow-book.entity';
import { QueryBorrowBookDto } from './dto/query-borrow-book.dto';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class BorrowBooksService {
  constructor(@InjectRepository(BorrowBook) private borrowBookRepository: Repository<BorrowBook>) {
  }
  
  create(createBorrowBookDto: BorrowBook) {
    return this.borrowBookRepository.save(createBorrowBookDto)
  }
  
  findAll(query?:QueryBorrowBookDto) {
    const {bookId,userId,status} = query
    if(Object.keys(query).length===0){
      return this.borrowBookRepository.find({
        relations: ['book','user'],
        order:{id:"DESC"}
      });
    }
    const bookCondition = bookId?{book:{id:+bookId}}:{}
    const userCondition =  userId?{user:{id:+userId}}:{}
    const statusCondition = status?status.map((status)=>({status,...bookCondition,...userCondition})):{...bookCondition,...userCondition}
    return this.borrowBookRepository.find({
      relations: ['book','user'],
      where:statusCondition,
      order:{id:"DESC"}
    });
  }
  
  findOne(id: number) {
    return this.borrowBookRepository.findOne(id,{
      relations:['book','user']
    })
  }
  
  update(id: number, updateBorrowBookDto: UpdateBorrowBookDto) {
    return this.borrowBookRepository.update(id,updateBorrowBookDto)
  }
  
  remove(id: number) {
    return this.borrowBookRepository.delete(id)
  }
  
  async checkIsOtherUserBorrowed(condition:QueryBorrowBookDto) {
    const {userId,startedDate,endDate,status,bookId} = condition
    const baseCondition:FindOneOptions['where'] = {
      book:{
        id:bookId
      },
      user:{
        id:Not(userId)
      },
      startedDate: LessThanOrEqual(endDate),
      endDate: MoreThanOrEqual(startedDate),
    }
    const borrowedBooks = await this.borrowBookRepository.findAndCount({
      relations:['book','user'],
      where:status?(status.map((status)=>({status,...baseCondition})) as FindOneOptions['where']):baseCondition,
    })
    console.log(borrowedBooks[0]);
    return borrowedBooks[1]!==0
  }
  
  async checkIsAlreadyBorrowed(condition:QueryBorrowBookDto) {
    const {userId,status,bookId} = condition
    const baseCondition:FindOneOptions['where'] = {
      book:{id:bookId},user:{id:userId}
    }
    const borrowedBooks = await this.borrowBookRepository.findAndCount({
      relations:['book','user'],
      where:status?(status.map((status)=>({status,...baseCondition})) as FindOneOptions['where']):baseCondition,
    })
    console.log(borrowedBooks[0]);
    return borrowedBooks[1]!==0
  }
  
  async getStatusStatistics() {
    return this.borrowBookRepository.query(`SELECT status ,count(*) as n FROM borrow_book GROUP BY status`)
  }
  
  async getTopTenBorrowedBook(){
    return this.borrowBookRepository.query(`SELECT  book.name,"bookId" ,count(*) as n FROM borrow_book ,book where "bookId" = book.id GROUP BY "bookId",book.name ORDER BY n DESC LIMIT 10`)
  }
  
  async getTopTenActiveReader(){
    return this.borrowBookRepository.query(`SELECT u."username","userId" ,count(*) as n FROM borrow_book, public.user as a where "userId" = u.id GROUP BY "userId",u."username" ORDER BY n DESC LIMIT 10`)
  }
  
  
  async getTopTenCategory(){
    return this.borrowBookRepository.query(`SELECT category.id,category.name,count(*) as n FROM borrow_book ,book,book_categories_category,category where borrow_book."bookId" = book.id AND book.id = book_categories_category."bookId" AND  book_categories_category."categoryId" = category."id" GROUP BY category.name,category.id ORDER BY n DESC LIMIT 10`)
  }
}
