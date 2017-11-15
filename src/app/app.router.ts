import { Router } from 'express';
import { createConnection } from 'typeorm';

// import { initialize, session, authRouter, verifyToken } from './auth';

import { createProductsRouter } from './products';
import { createUsersRouter } from './users';

export async function createAppRouter(): Promise<Router> {
  const entityPaths = [
    __dirname + '/products/typeorm/product.entity.js',
    __dirname + '/products/typeorm/review.entity.js',
    __dirname + '/users/typeorm/user.entity.js'
  ];

  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'nodejshomework',
    entities: entityPaths,
    synchronize: true
  });
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
