import { City } from './city';

export interface CitiesRepository {
  getAllCities(): Promise<Array<City>>;

  getCity(cityId: number): Promise<City>;

  getRandomCity(): Promise<City>;

  addCity(city: City): Promise<void>;

  initializeCities(cities: Array<City>): Promise<void>;
}
