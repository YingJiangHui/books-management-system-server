import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Nation } from '../nations/nation.entity';

type FieldErrors<P extends string> ={[K in P]:string[]}
@Entity()
export class User {
  constructor(user:Partial<User>) {
    Object.assign(this,user)
  }
  @PrimaryGeneratedColumn('increment')
  readonly id?: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  passwordDigest: string;
  
  @Column({type: 'varchar',nullable: true })
  email?: string;
  
  @ManyToOne(()=> Nation,nation => nation.user)
  nation?:Nation;
  
  @ManyToMany(()=>Role)
  @JoinTable()
  roles:Role[];
  
  password?: string;
  confirmPassword?: string;
  
  errors: FieldErrors<"username"|"confirmPassword"|"password"|"email"|"nation">
  
  validate() {
    if(this.confirmPassword!==this.password){
      this.errors.password.push('两次密码不相同')
    }
    if(this.password.length<6&&this.password.length>18){
      this.errors.password.push('密码长度在6-18位之间')
    }
    return this
  }
  
  
  
}
