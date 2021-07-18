import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
@Entity()
export class Nation {
  constructor(nation:Nation) {
    Object.assign(this,nation)
  }
  @PrimaryGeneratedColumn('increment')
  readonly id?: number;
  
  @Column('varchar')
  name: string;
  
  @OneToMany(()=> User,user => user.nation)
  user?:User[];
}
