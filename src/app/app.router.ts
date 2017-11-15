import { Router } from 'express';
import { createConnection } from 'typeorm';

// import { initialize, session, authRouter, verifyToken } from './auth';

import { createProductsRouter } from './products';
import { createUsersRouter } from './users';

export async function createAppRouter(): Promise<Router> {
  const connection = await createConnection();
  const productsRouter = await createProductsRouter(connection);
  const usersRouter = await createUsersRouter(connection);

  const appRouter = Router()
    // .use(initialize)
    // .use(session)
    // .use('/api/auth', authRouter)
    .use('/api/products', productsRouter)
    .use('/api/users', usersRouter)
    .get('/', (request, response) => {
      response.end('Hello, World!');
    });

  return appRouter;
}
