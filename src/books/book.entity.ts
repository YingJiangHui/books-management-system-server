import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Publisher from '../publishers/publisher.entity';
import Category from '../categorys/category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('increment')
  readonly id:number

  @Column('varchar')
  name:string
  
  @ManyToMany(()=>Category)
  @JoinTable()
  categories: Category[]
  
  @ManyToOne(()=>Publisher,publisher=>publisher.books)
  publisher:Publisher
}
export default Book