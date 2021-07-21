import { Entity,Column,PrimaryGeneratedColumn,ManyToMany,JoinTable,ManyToOne } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Nation } from '../nations/nation.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash')

type FieldError = { field: string,subErrors: string[] }

@Entity()
export class User {
  constructor(user: Partial<User>) {
    this.errors = [];
    Object.assign(this,user);
    if(!this.validatePasswordDigest())
      this.addError({field:'password',subErrors:['两次密码不相同']})
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
  
  password?: string;
  
  confirmPassword?: string;
  
  errors: FieldError[];
  
  addError(error: FieldError|FieldError[]) {
    this.errors = this.errors.concat(error);
  }
  getPasswordDigest(){
    return this.passwordDigest
  }
  validatePasswordDigest() {
    const isEqual = this.password === this.confirmPassword;
    if (isEqual)
      this.passwordDigest = this.password;
    return isEqual;
  }
  
  toJSON() {
    return _.omit(this, ['password', 'confirmPassword', 'passwordDigest', 'errors'])
  }
}
