import { IncomingMessage, ServerResponse } from 'http';

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [{ color: 'blue' }, { size: 'XL' }]
};

export function jsonHandler(request: IncomingMessage, response: ServerResponse): void {
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  response.end(JSON.stringify(product));
}
