import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowBookDto } from './create-borrow-book.dto';
import { IsISO8601, IsString } from 'class-validator';
import { BorrowBookStatus } from '../entities/borrow-book.entity';

export class UpdateBorrowBookDto extends PartialType(CreateBorrowBookDto) {
  @IsString()
  status: BorrowBookStatus;
  @IsISO8601()
  endDate:string;
  @IsISO8601()
  startedDate: string;
}
