import { IncomingMessage, ServerResponse } from 'http';

export function plainTextHandler(request: IncomingMessage, response: ServerResponse): void {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.end('Hello, World!');
}
