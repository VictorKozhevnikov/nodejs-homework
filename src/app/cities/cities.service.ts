import { City } from './city';
import { CitiesRepository } from './cities.repository';

import { cities as citiesInitialData } from './cities-initial-data';

export class CitiesService {
  private static mapInitialDataToCity(data: any): City {
    return {
      name: data.city,
      country: data.country,
      latitude: data.lat,
      longitude: data.lng,
      population: data.pop,
      province: data.province
    };
  }

  public constructor(private readonly citiesRepository: CitiesRepository) {}

  public getAllCities(): Promise<Array<City>> {
    return this.citiesRepository.getAllCities();
  }

  public getRandomCity(): Promise<City> {
    return this.citiesRepository.getRandomCity();
  }

  public initializeCities(): Promise<void> {
    return this.citiesRepository.initializeCities(
      citiesInitialData.map(CitiesService.mapInitialDataToCity)
    );
  }
}
