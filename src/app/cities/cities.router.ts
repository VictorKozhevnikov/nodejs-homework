import { Router } from 'express';
import { Db } from 'mongodb';

import { CitiesService, CitiesRepository } from '.';
import { CitiesMongoRepository } from './mongodb';

export async function createCitiesRouter(db: Db): Promise<Router> {
  // resolve services
  const citiesRepository: CitiesRepository = new CitiesMongoRepository(db);
  const citiesService = new CitiesService(citiesRepository);

  await citiesService.initializeCities();

  const citiesRouter = Router().get('/', async (request, response) => {
    const city = await citiesService.getRandomCity();
    response.json(city);
    response.end();
  });

  return citiesRouter;
}
