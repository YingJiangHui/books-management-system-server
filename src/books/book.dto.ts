import { IsArray, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookDto{
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  imagePath?: string;
  @IsString()
  @IsOptional()
  description:string;
  @IsString()
  author:string;
  @IsNumber()
  @IsOptional()
  quantity?:number;
  @IsISO8601()
  publicationDate: string;
  @IsArray()
  categories: number[];
  @IsNumber()
  publisher: number;
}