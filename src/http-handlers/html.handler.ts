import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as replace from 'stream-replace';

const htmlPath = './resources/index.html';
const token = '{message}';
const message = 'Hello, World!';

export function htmlHandler(request: IncomingMessage, response: ServerResponse): void {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });

  fs
    .createReadStream(htmlPath, { encoding: 'utf-8' })
    .pipe(replace(token, message))
    .pipe(response);
}
