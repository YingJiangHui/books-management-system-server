import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/user.entity';
import Book from '../../books/book.entity';

export type BorrowBookStatus = 'APPLIED'|'BORROWED'|'RESERVED'|'RETURNED'|'LOST'|'REFUSE'
@Entity()
export class BorrowBook {
  constructor(borrowBook:BorrowBook) {
    Object.assign(this,borrowBook)
  }
  @PrimaryGeneratedColumn('increment')
  readonly id?:number

  @ManyToOne(()=>User,user=>user.borrowBooks)
  user: User
  
  @ManyToOne(()=>Book,book=>book.borrowBooks)
  book: Book
  
  @Column({type:'int',nullable: true})
  quantity?: number
  
  @Column({type:'date'})
  startedDate: string
  
  @Column({type:'date'})
  endDate: string
  
  @Column({type:'varchar',default:'APPLIED'})
  status?: BorrowBookStatus
  
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
