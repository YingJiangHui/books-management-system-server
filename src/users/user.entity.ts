import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn, OneToOne, OneToMany
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { Nation } from '../nations/nation.entity';
import { BorrowBook } from '../borrow-books/entities/borrow-book.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash')
// eslint-disable-next-line @typescript-eslint/no-var-requires

type FieldError = { field: string,subErrors: string[] }

@Entity()
export class User {
  constructor(user: Partial<User>) {
    this.errors = [];
    Object.assign(this,user);
    this.validatePasswordDigest()
  }
  
  @PrimaryGeneratedColumn('increment')
  readonly id?: number;
  @Column('varchar')
  username: string;
  
  @Column('varchar')
  private passwordDigest: string;
  
  @Column({ type: 'varchar',nullable: true })
  email?: string;
  
  @ManyToOne(() => Nation,nation => nation.user)
  nation?: Nation;
  
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => BorrowBook,borrowBook => borrowBook.user)
  borrowBooks?: BorrowBook[];
  
  
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  
  password?: string;
  
  confirmPassword?: string;
  
  errors: FieldError[];
  
  addError(error: FieldError|FieldError[]) {
    this.errors = this.errors.concat(error);
  }
  encryptPass(hashFunctor:(pass:string)=>string){
    if(this.validatePasswordDigest())
      this.passwordDigest = this.password = this.passwordDigest = hashFunctor(this.password)
  }
  
  comparePass(compareFunctor:(pass:string)=>boolean):boolean {
    return compareFunctor(this.getPasswordDigest())
  }
  
  getPasswordDigest(){
    return this.passwordDigest
  }
  validatePasswordDigest() {
    if(this.password === this.confirmPassword && typeof this.password === 'string'){
      return true
    }else{
      this.addError({field:'password',subErrors:['两次密码不相同']});
      return false
    }
  }
  
  toJSON() {
    return _.omit(this, ['password', 'confirmPassword', 'passwordDigest', 'errors'])
  }
}
