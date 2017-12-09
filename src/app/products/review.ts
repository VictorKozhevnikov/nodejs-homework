import { Timestamped } from '../core/mongodb';

export interface Review extends Timestamped {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  title: string;
  summary: string;
}
