import { Entity, Column, PrimaryColumn } from 'typeorm';

import { Review } from '..';

@Entity()
export class ReviewEntity implements Review {
  @PrimaryColumn() public id: number;
  @Column() public productId: number;
  @Column() public userId: number;
  @Column() public rating: number;
  @Column() public title: string;
  @Column() public summary: string;
}
