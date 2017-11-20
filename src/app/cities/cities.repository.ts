import { City } from './city';

export interface CitiesRepository {
  getRandomCity(): Promise<City>;
  initializeCities(cities: Array<City>): Promise<void>;
}
