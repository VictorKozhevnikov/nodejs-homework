import { Typegoose, prop, pre } from 'typegoose';

import { Timestamped, setTimestamp } from '../../core/mongodb';

import { City } from '../city';

@pre<Timestamped>('save', setTimestamp)
export class CityTypegoose extends Typegoose implements City {
  @prop({ min: 0 })
  public id: number;

  @prop({ maxlength: 250 })
  public name: string;

  @prop({ min: -90.0, max: 90.0 })
  public latitude: number;

  @prop({ min: -180.0, max: 180.0 })
  public longitude: number;

  @prop({ min: 0 })
  public population: number;

  @prop({ maxlength: 250 })
  public country: string;

  @prop({ maxlength: 250 })
  public province: string;

  @prop()
  public lastModifiedDate: Date;
}
