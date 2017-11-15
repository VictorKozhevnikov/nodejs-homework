import * as express from 'express';
import { urlLog } from './core';

import { createAppRouter } from './app.router';

export async function createApp(): Promise<express.Express> {
  const appRouter = await createAppRouter();

  const app = express()
    .use(urlLog)
    .use('/', appRouter);

  return app;
}
