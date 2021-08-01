import { IsArray, IsISO8601, IsNumber, IsOptional } from 'class-validator';
import { BorrowBookStatus } from '../entities/borrow-book.entity';

export class QueryBorrowBookDto {
  @IsNumber()
  @IsOptional()
  userId?:number
  @IsNumber()
  @IsOptional()
  bookId?:number
  @IsArray()
  @IsOptional()
  status?: BorrowBookStatus[]
  @IsISO8601()
  @IsOptional()
  startedDate?: string
  @IsISO8601()
  @IsOptional()
  endDate?: string
}
