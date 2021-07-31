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

export type BorrowBookStatus = 'APPLIED'|'BORROWED'|'RETURNED'|'RESERVED'|'LOST'
@Entity()
export class BorrowBook {
  @PrimaryGeneratedColumn('increment')
  readonly id?:number
  @OneToOne(()=>User,(user)=>user.borrowBook)
  user: User
  
  @OneToOne(()=>Book,(book)=>book.borrowBook)
  book: Book
  
  @Column({type:'int'})
  quantity: number
  
  @Column({type:'date',nullable:true})
  startedDate: string
  
  @Column({type:'date',nullable:true})
  endDate: string
  
  @Column({type:'varchar',nullable:true})
  status: BorrowBookStatus
  
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
