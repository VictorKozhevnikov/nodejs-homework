import { Typegoose, prop } from 'typegoose';

import { Product } from '..';

export class ProductTypegoose extends Typegoose implements Product {
  @prop({ min: 0 })
  public id: number;

  @prop({ maxlength: 250 })
  @prop() public title: string;

  @prop({ min: 0 })
  public releaseYear: number;
}
