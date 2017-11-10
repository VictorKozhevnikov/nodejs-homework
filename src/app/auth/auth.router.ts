import { Router, json } from 'express';
import { Credentials } from './credentials';
import { authService } from './auth.service';

export const authRouter = Router()
  .use(json())
  .post('/', (request, response) => {
    const credentials: Credentials = {
      email: request.body.email,
      password: request.body.password
    };

    const tokenResponse = authService.issueToken(credentials);

    if (tokenResponse) {
      response.status(200).json(tokenResponse);
    } else {
      response.status(404).end('Not found');
    }
  });
