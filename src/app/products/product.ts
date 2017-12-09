import { Timestamped } from '../core/mongodb';

export interface Product extends Timestamped {
  id: number;
  title: string;
  releaseYear: number;
}
