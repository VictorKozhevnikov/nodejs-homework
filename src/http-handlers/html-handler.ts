import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';

const htmlPath = './resources/index.html';
const token = '{message}';
const message = 'Hello, World!';

export function htmlHandler(request: IncomingMessage, response: ServerResponse): void {
  const template: string = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
  const html = template.replace(token, message);
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  response.end(html);
}
