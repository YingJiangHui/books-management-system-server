import { Injectable } from '@nestjs/common';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BorrowBook, BorrowBookStatus } from './entities/borrow-book.entity';
import { BorrowBookQuery } from './borrow-books.controller';

@Injectable()
export class BorrowBooksService {
  constructor(@InjectRepository(BorrowBook) private borrowBookRepository: Repository<BorrowBook>) {
  }
  
  create(createBorrowBookDto: BorrowBook) {
    return this.borrowBookRepository.save(createBorrowBookDto)
  }
  
  findAll(query?:BorrowBookQuery) {
    const {bookId,userId,status} = query
    if(Object.keys(query).length===0){
      return this.borrowBookRepository.find();
    }
    const bookCondition = bookId?{book:{id:+bookId}}:{}
    const userCondition =  userId?{user:{id:+userId}}:{}
    const statusCondition = status?{status}:{}
    return this.borrowBookRepository.find({
      relations: ['book','user'],
      where:{
        ...statusCondition,
        ...bookCondition,
        ...userCondition,
      }
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
