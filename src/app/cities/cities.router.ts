import { Router } from 'express';
import { Connection } from 'mongoose';

import { CitiesService, CitiesRepository } from '.';
import { CitiesMongoRepository } from './mongodb';

export async function createCitiesRouter(connection: Connection): Promise<Router> {
  // resolve services
  const citiesRepository: CitiesRepository = new CitiesMongoRepository(connection);
  const citiesService = new CitiesService(citiesRepository);

  await citiesService.initializeCities();

  const citiesRouter = Router().get('/', (request, response) => {
    citiesService.getAllCities().then(cities => response.json(cities).end());
  });

  return citiesRouter;
}
