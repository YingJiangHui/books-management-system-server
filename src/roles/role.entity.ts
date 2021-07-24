import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @JoinTable()
  user?: User[]
}
