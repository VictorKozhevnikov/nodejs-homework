import { Typegoose, prop } from 'typegoose';

import { City } from '../city';

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
  @prop()
  public country: string;

  @prop({ maxlength: 250 })
  @prop()
  public province: string;
}
