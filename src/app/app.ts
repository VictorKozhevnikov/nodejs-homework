import * as express from 'express';
// import * as cookieParser from 'cookie-parser';

import { appRouter } from './app.router';

export const app = express()
  // .use(cookieParser())
  .use('/', appRouter);
