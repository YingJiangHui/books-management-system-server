import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Nation } from './nation.entity';

@Entity()
export class User {
  constructor(user:User) {
    Object.assign(this,user)
  }
  @PrimaryGeneratedColumn('increment')
  readonly id?: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;
  
  @Column({type: 'varchar',nullable: true })
  email?: string;
  
  @ManyToOne(()=> Nation,nation => nation.user)
  nation?:Nation;
  
  @ManyToMany(()=>Role)
  @JoinTable()
  roles:Role[];
  
  passwordDigest?: string;
  confirmPassword?: string;
}
