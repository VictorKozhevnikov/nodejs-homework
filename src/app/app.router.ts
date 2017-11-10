import { Router } from 'express';

import { initialize, session, authRouter, verifyToken } from './auth';

import { productsRouter } from './products';
import { usersRouter } from './users';

export const appRouter = Router()
  .use(initialize)
  .use(session)
  .use('/api/auth', authRouter)
  .use('/api/products', verifyToken, productsRouter)
  .use('/api/users', verifyToken, usersRouter)
  .get('/', (request, response) => {
    response.end('Hello, World!');
  });
