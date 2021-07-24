import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import Book from '../books/book.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  readonly id:number
  
  @Column({type: 'varchar',unique:true })
  name:string
  
  @ManyToMany(()=>Book)
  @JoinTable()
  books?: Book[]
}

export default Category