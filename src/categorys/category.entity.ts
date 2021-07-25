import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import Book from '../books/book.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  readonly id:number
  
  @Column({type: 'varchar',unique:true })
  name:string
  
  @ManyToMany(()=>Book)
  books?: Book[]
  
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Category