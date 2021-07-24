import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AccountModule } from './account/account.module';
import { NationsModule } from './nations/nations.module';
import { UsersModule } from './users/users.module';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { CategoriesService } from './categorys/categories.service';
import { CategoriesController } from './categorys/categories.controller';
import { CategoriesModule } from './categorys/categories.module';
import { PublishersService } from './publishers/publishers.service';

@Module({
  imports: [TypeOrmModule.forRoot(),AccountModule,NationsModule,UsersModule, BooksModule, PublishersModule, CategoriesModule],
  controllers: [AppController, BooksController, CategoriesController,CategoriesController],
  providers: [AppService, BooksService, CategoriesService,PublishersService],
})
export class AppModule {
  // 注入connection后在整个项目中都可是使用不需要再导入，使用方法在类的构造函数中传递即可
  constructor(private readonly connection: Connection) {}
}
