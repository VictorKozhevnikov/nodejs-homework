import { Router } from 'express';
import { Connection } from 'typeorm';

import { UserService } from './users.service';
import { UserEntity, UsersTypeormRepository } from './typeorm';

export async function createUsersRouter(connection: Connection): Promise<Router> {
  const usersRepository = new UsersTypeormRepository(connection.getRepository(UserEntity));
  const usersService = new UserService(usersRepository);

  await usersService.initializeUsers();

  const usersRouter = Router().get('/', async (request, response) => {
    const users = await usersService.getAllUsers();
    response.json(users);
    response.end();
  });

  return usersRouter;
}
