import * as express from 'express';
import { cookieLog, cookieParse, cookieSet } from './core';

import { appRouter } from './app.router';

export const app = express()
  .use(cookieParse, cookieLog, cookieSet)
  .use('/', appRouter);
