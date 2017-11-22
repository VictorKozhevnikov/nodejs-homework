import { Typegoose, prop } from 'typegoose';

import { Product } from '..';

export class ProductTypegoose extends Typegoose implements Product {
  @prop() public id: number;

  @prop() public title: string;

  @prop() public releaseYear: number;
}
