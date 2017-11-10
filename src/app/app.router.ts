import { Router } from 'express';

import { authRouter, verifyToken } from './auth';
import { productsRouter } from './products';
import { usersRouter } from './users';

export const appRouter = Router()
  .use('/api/auth', authRouter)
  .use('/api/products', verifyToken, productsRouter)
  .use('/api/users', verifyToken, usersRouter)
  .get('/', (request, response) => {
    response.end('Hello, World!');
  });
