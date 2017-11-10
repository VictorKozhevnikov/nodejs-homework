import { Router } from 'express';

import { authRouter } from './auth';
import { productsRouter } from './products';
import { usersRouter } from './users';

export const appRouter = Router()
  .use('/api/auth', authRouter)
  .use('/api/products', productsRouter)
  .use('/api/users', usersRouter)
  .get('/', (request, response) => {
    response.end('Hello, World!');
  });
