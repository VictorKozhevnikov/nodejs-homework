import { Router } from 'express';
import Lowdb = require('lowdb');
import MemoryAdapter = require('lowdb/adapters/Memory');
import { UserService } from './users.service';

// composition root
const db = new Lowdb(new MemoryAdapter());
const usersService = new UserService(db);

usersService.initializeUsers();

export const usersRouter = Router().get('/', (request, response) => {
  const users = usersService.getAllUsers();
  response.json(users);
  response.end();
});
