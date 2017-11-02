import { IncomingMessage, ServerResponse } from 'http';

export function echoHandler(request: IncomingMessage, response: ServerResponse): void {
  response.writeHead(200, {
    'Content-Type': request.headers['Content-Type']
  });

  request.pipe(response);
}
