import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BorrowBookStatus } from '../entities/borrow-book.entity';

export class CreateBorrowBookDto {
  @IsOptional()
  @IsString()
  status: BorrowBookStatus;
  @IsNotEmpty()
  @IsISO8601()
  endDate:string;
  @IsNotEmpty()
  @IsISO8601()
  startedDate: string;
  
  @IsNotEmpty()
  bookId:string
}
