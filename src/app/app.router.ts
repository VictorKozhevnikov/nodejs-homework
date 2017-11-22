import { Router } from 'express';
import * as mongoose from 'mongoose';

import { createProductsRouter } from './products';
import { createUsersRouter } from './users';
import { createCitiesRouter } from './cities';

const mongoUrl = 'mongodb://localhost:27017/nodejsHomework';

export async function createAppRouter(): Promise<Router> {
  // initialize db connections
  const mongoConnection = mongoose.createConnection(mongoUrl);

  const productsRouter = await createProductsRouter(mongoConnection);
  const usersRouter = await createUsersRouter(mongoConnection);
  const citiesRouter = await createCitiesRouter(mongoConnection);

  const appRouter = Router()
    .use('/api/products', productsRouter)
    .use('/api/users', usersRouter)
    .use('/api/cities', citiesRouter)
    .get('/', (request, response) => {
      response.end('Hello, World!');
    });

  return appRouter;
}
