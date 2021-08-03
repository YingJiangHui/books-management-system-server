import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AccountModule } from './account/account.module';
import { NationsModule } from './nations/nations.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { CategoriesModule } from './categorys/categories.module';
import { CommentsModule } from './comments/comments.module';
import { BorrowBooksModule } from './borrow-books/borrow-books.module';
import { StatisticsModule } from './statistics/statistics.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [TypeOrmModule.forRoot(),AccountModule,NationsModule,UsersModule, BooksModule, PublishersModule, CategoriesModule, CommentsModule, BorrowBooksModule, StatisticsModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 注入connection后在整个项目中都可是使用不需要再导入，使用方法在类的构造函数中传递即可
  constructor(private readonly connection: Connection) {}
}
