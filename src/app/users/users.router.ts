import { Router } from 'express';
import { Connection } from 'mongoose';

import { UserService } from './users.service';
import { UsersMongoRepository } from './mongodb';

export async function createUsersRouter(connection: Connection): Promise<Router> {
  const usersRepository = new UsersMongoRepository(connection);
  const usersService = new UserService(usersRepository);

  await usersService.initializeUsers();

  const usersRouter = Router()
    .get('/', async (request, response) => {
      const users = await usersService.getAllUsers();
      response.json(users);
      response.end();
    })
    // guard against invalid param
    .param('userId', (request, response, next) => {
      const userIdString: string = request.params.userId;
      const userIdInt: number = parseInt(userIdString, 10);
      if (isNaN(userIdInt) || userIdInt < 0) {
        response.status(404).end();
      } else {
        response.locals.userIdInt = userIdInt;
        next();
      }
    })
    .delete('/:userId', async (request, response) => {
      await usersService
        .deleteUser(response.locals.userIdInt)
        .then(() => response.status(200).end());
    });

  return usersRouter;
}
