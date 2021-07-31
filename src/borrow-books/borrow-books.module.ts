import { Module } from '@nestjs/common';
import { BorrowBooksService } from './borrow-books.service';
import { BorrowBooksController } from './borrow-books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowBook } from './entities/borrow-book.entity';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowBook]),BooksModule], // 导入实体
  controllers: [BorrowBooksController],
  providers: [BorrowBooksService],
  exports: [BorrowBooksService]
})
export class BorrowBooksModule {}
