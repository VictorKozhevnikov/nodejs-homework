import * as express from 'express';
import { urlLog, cookieLog, cookieParse, cookieSet, queryParse, queryLog } from './core';

import { appRouter } from './app.router';

export const app = express()
  .use(urlLog, cookieParse, cookieLog, queryParse, queryLog, cookieSet)
  .use('/', appRouter);
