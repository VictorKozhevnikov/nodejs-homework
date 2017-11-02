import * as http from 'http';

import { Handler, plainTextHandler, htmlHandler } from './http-handlers';

const port = 3000;

let handler: Handler | null;

const handlerName = process.argv.splice(2, 1)[0];
switch (handlerName) {
  case 'plain-text':
    handler = plainTextHandler;
    break;
  case 'html':
    handler = htmlHandler;
    break;
  default:
    handler = null;
}

if (handler) {
  http.createServer(handler).listen(port);
  console.log(`Listening on port ${port}`);
} else {
  console.log('No handler selected');
}
