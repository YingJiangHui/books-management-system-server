import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { BookController } from '../controller/book.controller';
import { AppService } from '../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users.module';
import { NationsModule } from './nations.module';

@Module({
  imports: [TypeOrmModule.forRoot(),UsersModule,NationsModule],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {
  // 注入connection后在整个项目中都可是使用不需要再导入，使用方法在类的构造函数中传递即可
  constructor(private readonly connection: Connection) {}
}
