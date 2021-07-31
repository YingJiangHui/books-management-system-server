import { Module } from '@nestjs/common';
import { BorrowBooksService } from './borrow-books.service';
import { BorrowBooksController } from './borrow-books.controller';

@Module({
  controllers: [BorrowBooksController],
  providers: [BorrowBooksService]
})
export class BorrowBooksModule {}
