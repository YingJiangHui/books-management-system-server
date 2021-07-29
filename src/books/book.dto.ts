import { IsArray, IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookDto{
  @IsNotEmpty()
  name: string;
  @IsString()
  imagePath?: string;
  @IsString()
  description:string;
  @IsString()
  author:string;
  @IsISO8601()
  publicationDate: string;
  @IsArray()
  categories: number[];
  @IsNumber()
  publisher: number;
}