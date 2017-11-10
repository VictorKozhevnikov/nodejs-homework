import { Router, json } from 'express';

const userName = 'user';
const allowedEmail = 'user@example.com';
const allowedPassword = 'password';
const token = '00e52225e0634e8aa10f7c45dbf6ea6f';

export const authRouter = Router()
  .use(json())
  .post('/', (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    if (email === allowedEmail && password === allowedPassword) {
      response.status(200).json({
        user: { email: allowedEmail, username: userName },
        token
      });
    } else {
      response.status(404).end('Not found');
    }
  });
