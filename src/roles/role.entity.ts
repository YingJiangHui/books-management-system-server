import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Role {
  constructor(role:Role) {
      Object.assign(this,role)
  }
  @PrimaryGeneratedColumn('increment')
  readonly id?: number;
  
  @Column({type: 'varchar',unique:true })
  name: string
  
  @ManyToMany(()=>User)
  user?: User[]
  
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
