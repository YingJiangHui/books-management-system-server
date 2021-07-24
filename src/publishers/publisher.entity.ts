import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Book from '../books/book.entity';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn('increment')
  readonly id:number
  
  @Column({type: 'varchar',unique:true })
  name:string
  
  @OneToMany(()=>Book,book=>book.publisher)
  books: Book[]
}

export default Publisher