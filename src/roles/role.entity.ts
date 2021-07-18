import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  constructor(role:Role) {
      Object.assign(this,role)
  }
  @PrimaryGeneratedColumn('increment')
  readonly id?: number;

  @Column('varchar')
  name: string
}
