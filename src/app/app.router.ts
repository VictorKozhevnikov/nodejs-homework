import { Router } from 'express';

export const appRouter = Router().get('/', (request, response) => {
  response.end('Hello, World!');
});
