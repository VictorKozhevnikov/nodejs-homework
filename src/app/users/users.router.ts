import { Router } from 'express';
import { Connection } from 'mongoose';

import { UserService } from './users.service';
import { UsersMongoRepository } from './mongodb';

export async function createUsersRouter(connection: Connection): Promise<Router> {
  const usersRepository = new UsersMongoRepository(connection);
  const usersService = new UserService(usersRepository);

  await usersService.initializeUsers();

  const usersRouter = Router().get('/', async (request, response) => {
    const users = await usersService.getAllUsers();
    response.json(users);
    response.end();
  });

  return usersRouter;
}
