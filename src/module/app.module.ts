import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { BookController } from '../controller/book.controller';
import { AppService } from '../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forRoot(),UsersModule],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
