import { Test, TestingModule } from '@nestjs/testing';
import { BorrowBooksService } from './borrow-books.service';

describe('BorrowBooksService', () => {
  let service: BorrowBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowBooksService],
    }).compile();

    service = module.get<BorrowBooksService>(BorrowBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
