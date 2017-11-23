import { Typegoose, prop, pre } from 'typegoose';

import { Timestamped, setTimestamp } from '../../core/mongodb';

import { Review } from '..';

@pre<Timestamped>('save', setTimestamp)
export class ReviewTypegoose extends Typegoose implements Review {
  @prop({ min: 0 })
  public id: number;

  @prop({ min: 0 })
  public productId: number;

  @prop({ min: 0 })
  public userId: number;

  @prop({ min: 0.0, max: 5.0 })
  public rating: number;

  @prop({ maxlength: 250 })
  public title: string;

  @prop({ maxlength: 2500 })
  public summary: string;

  @prop()
  public lastModifiedDate: Date;
}
