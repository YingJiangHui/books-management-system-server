import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Book from '../books/book.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  readonly id:number
  
  @Column({type: 'varchar',unique:true })
  text:string
  
  @ManyToOne(()=>Book,book=>book.comments)
  book: Book
  
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}

export default Comment