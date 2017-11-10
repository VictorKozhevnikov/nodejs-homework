import { Router } from 'express';

import { productsRouter } from './products';
import { usersRouter } from './users';

export const appRouter = Router()
  .use('/api/products', productsRouter)
  .use('/api/users', usersRouter)
  .get('/', (request, response) => {
    response.end('Hello, World!');
  });
