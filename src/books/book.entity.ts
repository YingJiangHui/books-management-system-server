import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import Publisher from '../publishers/publisher.entity';
import Category from '../categorys/category.entity';
import Comment from '../comments/comment.entity';
import { BorrowBook } from '../borrow-books/entities/borrow-book.entity';

@Entity()
export class Book {
  constructor(book?:Book) {
    Object.assign(this,book)
  }
  
  
  @PrimaryGeneratedColumn('increment')
  readonly id?:number

  @Column('varchar')
  name:string
  
  @Column({type:'varchar',unique:true})
  isbn? :string
  
  @Column({ type: 'varchar',nullable: true })
  imagePath?: string
  
  @Column({ type: 'varchar',nullable: true })
  description?: string
  
  @Column({ type: 'varchar',nullable: true })
  author?: string
  
  @Column({ type: 'varchar',nullable: true })
  publicationDate?: string
  
  @Column({type:'int'})
  totalQuantity?: number
  
  @Column({type:'int'})
  residualQuantity?: number
  
  @ManyToMany(()=>Category)
  @JoinTable()
  categories: Category[]
  @ManyToOne(()=>Publisher,publisher=>publisher.books)
  publisher:Publisher
  
  @OneToMany(()=>Comment,comment=>comment.book)
  comments?:Comment[]
  
  @OneToOne(()=>BorrowBook)
  borrowBook?: BorrowBook
  
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
export default Book