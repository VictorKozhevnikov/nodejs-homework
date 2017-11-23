import { City } from './city';
import { CityData } from './city-data';
import { CitiesRepository } from './cities.repository';

import { cities as citiesInitialData } from './cities-initial-data';

export class CitiesService {
  private nextId: number = 0;

  public constructor(private readonly citiesRepository: CitiesRepository) {}

  public getAllCities(): Promise<Array<City>> {
    return this.citiesRepository.getAllCities();
  }

  public getCity(cityId: number): Promise<City> {
    return this.citiesRepository.getCity(cityId);
  }

  public getRandomCity(): Promise<City> {
    return this.citiesRepository.getRandomCity();
  }

  public async addCity(cityData: CityData): Promise<City> {
    const city: City = this.makeCity(cityData);
    await this.citiesRepository.addCity(city);
    return city;
  }

  public initializeCities(): Promise<void> {
    return this.citiesRepository.initializeCities(
      citiesInitialData.map((data, index) => this.mapInitialDataToCity(data, index))
    );
  }

  private makeCity(data: CityData): City {
    return {
      id: this.nextId++,
      name: data.name,
      country: data.country,
      latitude: data.latitude,
      longitude: data.longitude,
      population: data.population,
      province: data.province
    };
  }

  private mapInitialDataToCity(data: any, index: number): City {
    if (index > this.nextId) {
      this.nextId = index + 1;
    }

    return {
      id: index,
      name: data.city,
      country: data.country,
      latitude: data.lat,
      longitude: data.lng,
      population: data.pop,
      province: data.province
    };
  }
}
