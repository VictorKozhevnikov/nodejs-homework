import { Timestamped } from '../core/mongodb';

export interface City extends Timestamped {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  country: string;
  province: string;
}
