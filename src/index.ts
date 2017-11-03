import * as http from 'http';
import * as express from 'express';

import { Handler, plainTextHandler, htmlHandler, jsonHandler, echoHandler } from './http-handlers';
import { app } from './app';

const port = 3000;

let handler: Handler | null = null;
let application: express.Application | null = null;

const handlerName = process.argv.splice(2, 1)[0];
switch (handlerName) {
  case 'plain-text':
    handler = plainTextHandler;
    break;
  case 'html':
    handler = htmlHandler;
    break;
  case 'json':
    handler = jsonHandler;
    break;
  case 'echo':
    handler = echoHandler;
    break;
  case 'app':
    application = app;
    break;
  default:
    handler = null;
}

if (handler) {
  http.createServer(handler).listen(port);
  console.log(`Listening on port ${port}`);
} else if (app) {
  app.listen(port, () => console.log(`Listening on port ${port}`));
} else {
  console.log('No handler selected');
}
