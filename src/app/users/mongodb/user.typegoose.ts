import { Typegoose, prop, pre } from 'typegoose';

import { Timestamped, setTimestamp } from '../../core/mongodb';

import { User } from '../user';

@pre<Timestamped>('save', setTimestamp)
export class UserTypegoose extends Typegoose implements User {
  @prop({ min: 0 })
  public id: number;

  @prop({ maxlength: 250 })
  public name: string;

  @prop()
  public lastModifiedDate: Date;
}
