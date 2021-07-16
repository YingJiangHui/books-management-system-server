import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { BookController } from '../controller/book.controller';
import { AppService } from '../service/app.service';

@Module({
  imports: [],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {}
