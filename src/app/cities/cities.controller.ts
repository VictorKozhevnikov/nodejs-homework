import { Request, Response } from 'express';

import { mongoConnection } from '../core/mongodb/mongo-connection';

import { CitiesService } from './cities.service';
import { CitiesRepository } from './cities.repository';
import {CitiesMongoRepository} from './mongodb';

export class CitiesController {
  public constructor(private readonly citiesService: CitiesService) {}

  public getAllCities(request: Request, response: Response): void {
    this.citiesService.getAllCities().then(cities => response.json(cities).end());
  }

  public addCity(request: Request, response: Response): void {
    response.status(500).end();
  }
}

const citiesRepository: CitiesRepository = new CitiesMongoRepository(mongoConnection);
const service = new CitiesService(citiesRepository);

export const createCitiesController = new CitiesController(service);
