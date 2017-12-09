import { Timestamped } from '../core/mongodb';

export interface User extends Timestamped {
  id: number;
  name: string;
}
