import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/user.entity';
import Book from '../../books/book.entity';

export type BorrowBookStatus = 'ACTION'|'APPLIED'|'BORROWED'|'RETURNED'|'RESERVED'|'LOST'
@Entity()
export class BorrowBook {
  @PrimaryGeneratedColumn('increment')
  readonly id?:number
  @OneToOne(()=>User,(user)=>user.borrowBook)
  user: User
  
  @OneToOne(()=>Book)
  book: Book
  
  @Column({type:'int',nullable: true})
  quantity: number
  
  @Column({type:'date'})
  startedDate: string
  
  @Column({type:'date'})
  endDate: string
  
  @Column({type:'varchar',default:'ACTION'})
  status: BorrowBookStatus
  
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
