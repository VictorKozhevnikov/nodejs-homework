import { Request as ExpressRequest, Response } from 'express';

import { mongoConnection } from '../../core/mongodb/mongo-connection';

import { CitiesService } from '../cities.service';
import { CitiesRepository } from '../cities.repository';
import { CitiesMongoRepository } from '../mongodb';

// TODO: move this declaration to a common place somewhere
declare module 'express' {
  interface Request {
    swagger: any;
  }
}

const citiesRepository: CitiesRepository = new CitiesMongoRepository(mongoConnection);
const citiesService = new CitiesService(citiesRepository);

export function getAllCities(request: ExpressRequest, response: Response): void {
  citiesService.getAllCities().then(cities => response.json(cities).end());
}

export function addCity(request: ExpressRequest, response: Response): void {
  citiesService.addCity(request.body).then(city => response.json(city).end());
}

export function getCity(request: ExpressRequest, response: Response): void {
  const cityId = request.swagger.params.cityId.value;
  citiesService.getCity(cityId).then(city => response.json(city).end());
}

export function updateCity(request: ExpressRequest, response: Response): void {
  const cityId = request.swagger.params.cityId.value;
  const cityData = request.swagger.params.city.value;
  citiesService.addOrUpdateCity(cityId, cityData).then(city => response.json(city).end());
}

export function deleteCity(request: ExpressRequest, response: Response): void {
  const cityId = request.swagger.params.cityId.value;
  citiesService.deleteCity(cityId).then(city => response.json(city).end());
}
