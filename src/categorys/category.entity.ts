import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Book from '../books/book.entity';

@Entity()
export class Category {
  constructor(category?:Category) {
    Object.assign(this,category)
  }
  @PrimaryGeneratedColumn('increment')
  readonly id?:number
  
  @Column({type: 'varchar',unique:true })
  name:string
  
  @ManyToMany(()=>Book)
  books?: Book[]
  
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}

export default Category