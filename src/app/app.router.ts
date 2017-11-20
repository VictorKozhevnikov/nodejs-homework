import { Router } from 'express';
import { createConnection } from 'typeorm';
import { MongoClient } from 'mongodb';

import { createProductsRouter } from './products';
import { createUsersRouter } from './users';
import { createCitiesRouter } from './cities';

const mongoUrl = 'mongodb://localhost:27017/nodejsHomework';

export async function createAppRouter(): Promise<Router> {
  // initialize db connections
  const connection = await createConnection();
  const db = await MongoClient.connect(mongoUrl);

  const productsRouter = await createProductsRouter(connection);
  const usersRouter = await createUsersRouter(connection);
  const citiesRouter = await createCitiesRouter(db);

  const appRouter = Router()
    .use('/api/products', productsRouter)
    .use('/api/users', usersRouter)
    .use('/api/cities', citiesRouter)
    .get('/', (request, response) => {
      response.end('Hello, World!');
    });

  return appRouter;
}
