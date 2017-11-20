import { Entity, Column, PrimaryColumn } from 'typeorm';

import { User } from '../user';

@Entity()
export class UserEntity implements User {
  @PrimaryColumn() public id: number;
  @Column() public name: string;
}
