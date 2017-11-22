import { Typegoose, prop } from 'typegoose';

import { Review } from '..';

export class ReviewTypegoose extends Typegoose implements Review {
  @prop() public id: number;
  @prop() public productId: number;
  @prop() public userId: number;
  @prop() public rating: number;
  @prop() public title: string;
  @prop() public summary: string;
}
