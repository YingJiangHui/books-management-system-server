import { Injectable } from '@nestjs/common';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';

@Injectable()
export class BorrowBooksService {
  create(createBorrowBookDto: CreateBorrowBookDto) {
    return 'This action adds a new borrowBook';
  }

  findAll() {
    return `This action returns all borrowBooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowBook`;
  }

  update(id: number, updateBorrowBookDto: UpdateBorrowBookDto) {
    return `This action updates a #${id} borrowBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowBook`;
  }
}
