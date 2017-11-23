import { Typegoose, prop } from 'typegoose';

import { User } from '../user';

export class UserTypegoose extends Typegoose implements User {
  @prop({ min: 0 })
  public id: number;

  @prop({ maxlength: 250 })
  public name: string;
}
