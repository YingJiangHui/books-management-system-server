import { Injectable } from '@nestjs/common';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { BorrowBook } from './entities/borrow-book.entity';
import { QueryBorrowBookDto } from './dto/query-borrow-book.dto';

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
    return this.borrowBookRepository.findOne(id)
  }
  
  update(id: number, updateBorrowBookDto: UpdateBorrowBookDto) {
    return this.borrowBookRepository.update(id,updateBorrowBookDto)
  }
  
  remove(id: number) {
    return this.borrowBookRepository.delete(id)
  }
}
