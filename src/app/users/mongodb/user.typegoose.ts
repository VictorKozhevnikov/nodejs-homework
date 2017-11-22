import { Typegoose, prop } from 'typegoose';

import { User } from '../user';

export class UserTypegoose extends Typegoose implements User {
  @prop() public id: number;
  @prop() public name: string;
}
