import { Typegoose, prop, pre } from 'typegoose';

import { Timestamped, setTimestamp } from '../../core/mongodb';

import { Product } from '..';

@pre<Timestamped>('save', setTimestamp)
export class ProductTypegoose extends Typegoose implements Product {
  @prop({ min: 0 })
  public id: number;

  @prop({ maxlength: 250 })
  public title: string;

  @prop({ min: 0 })
  public releaseYear: number;

  @prop()
  public lastModifiedDate: Date;
}
