import { Router, json } from 'express';
import { Connection } from 'mongoose';

import { CitiesService, CitiesRepository } from '.';
import { CitiesMongoRepository } from './mongodb';

export async function createCitiesRouter(connection: Connection): Promise<Router> {
  // resolve services
  const citiesRepository: CitiesRepository = new CitiesMongoRepository(connection);
  const citiesService = new CitiesService(citiesRepository);

  await citiesService.initializeCities();

  const citiesRouter = Router()
    .use(json())
    // guard against invalid param
    .param('cityId', (request, response, next) => {
      const cityIdString: string = request.params.cityId;
      const cityIdInt: number = parseInt(cityIdString, 10);
      if (isNaN(cityIdInt) || cityIdInt < 0) {
        response.status(404).end();
      } else {
        response.locals.cityIdInt = cityIdInt;
        next();
      }
    })
    .get('/', (request, response) => {
      citiesService.getAllCities().then(cities => response.json(cities).end());
    })
    .post('/', (request, response) => {
      citiesService.addCity(request.body).then(city => response.json(city).end());
    })
    .get('/:cityId', (request, response) => {
      citiesService.getCity(response.locals.cityIdInt).then(city => response.json(city).end());
    })
    .put('/:cityId', (request, response) => {
      citiesService
        .addOrUpdateCity(response.locals.cityIdInt, request.body)
        .then(city => response.json(city).end());
    })
    .delete('/:cityId', (request, response) => {
      citiesService.deleteCity(response.locals.cityIdInt).then(city => response.status(200).end());
    });

  return citiesRouter;
}
