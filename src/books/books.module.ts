import { forwardRef, Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Book from './book.entity';
import { BooksService } from './books.service';
import { CategoriesModule } from '../categorys/categories.module';
import { PublishersModule } from '../publishers/publishers.module';
import { BorrowBooksModule } from '../borrow-books/borrow-books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]),CategoriesModule,PublishersModule,forwardRef(()=>BorrowBooksModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports:[BooksService]
})
export class BooksModule {}
