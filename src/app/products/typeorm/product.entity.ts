import { Entity, Column, PrimaryColumn } from 'typeorm';

import { Product } from '..';

@Entity()
export class ProductEntity implements Product {
  @PrimaryColumn() public id: number;

  @Column() public title: string;

  @Column() public releaseYear: number;
}
