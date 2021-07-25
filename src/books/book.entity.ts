import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import Publisher from '../publishers/publisher.entity';
import Category from '../categorys/category.entity';
import Comment from '../comments/comment.entity';

@Entity()
export class Book {
  constructor(book?:Book) {
    Object.assign(this,book)
  }
  
  
  @PrimaryGeneratedColumn('increment')
  readonly id?:number

  @Column('varchar')
  name:string
  
  // @Column({type:'varchar',unique:true})
  // isbn? :string
  
  @Column({ type: 'varchar',nullable: true })
  imagePath?: string
  
  @Column({ type: 'varchar',nullable: true })
  description?: string
  
  @Column({ type: 'varchar',nullable: true })
  author?: string
  
  @Column({ type: 'varchar',nullable: true })
  publicationDate?: string
  
  @ManyToMany(()=>Category)
  @JoinTable()
  categories: Category[]
  
  @ManyToOne(()=>Publisher,publisher=>publisher.books)
  publisher:Publisher
  
  @OneToMany(()=>Comment,comment=>comment.book)
  comments?:Comment[]
  
  
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
export default Book