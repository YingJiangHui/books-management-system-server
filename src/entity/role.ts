import { Column, Entity } from 'typeorm';

@Entity()
export class role {
  @Column('varchar')
  name: string
  
}
