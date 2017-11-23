import { City } from './city';

export interface CitiesRepository {
  getAllCities(): Promise<Array<City>>;

  getRandomCity(): Promise<City>;

  initializeCities(cities: Array<City>): Promise<void>;
}
