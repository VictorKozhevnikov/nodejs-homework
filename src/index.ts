import * as http from 'http';

import { plainTextHandler } from './http-handlers';

const port = 3000;

http.createServer(plainTextHandler).listen(port);
console.log(`Listening on port ${port}`);
