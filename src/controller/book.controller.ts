import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BookController {
  @Get()
  getBooks(): string[] {
    return ['book1', 'book2'];
  }
}
