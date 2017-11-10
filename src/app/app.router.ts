import { Router } from 'express';

import { initialize, authRouter, verifyToken } from './auth';

import { productsRouter } from './products';
import { usersRouter } from './users';

export const appRouter = Router()
  .use(initialize)
  .use('/api/auth', authRouter)
  .use('/api/products', verifyToken, productsRouter)
  .use('/api/users', verifyToken, usersRouter)
  .get('/', (request, response) => {
    response.end('Hello, World!');
  });
