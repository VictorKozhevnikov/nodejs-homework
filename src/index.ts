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
  case 'help':
    // don't set anything on help
    break;
  default:
    console.log(`No options provided. Starting express application by default.
Run node ./dist help to see available options
`);
    application = app;
    handler = null;
}

if (handler) {
  http.createServer(handler).listen(port);
  console.log(`Listening on port ${port}`);
} else if (application) {
  application.listen(port, () => console.log(`Listening on port ${port}`));
} else {
  console.log(`Usage
node ./dist <command>

command: plain-text, html, json, echo, app
`);
}
