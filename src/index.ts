import 'reflect-metadata';

import { createApp } from './app';

const port = 3000;

createApp()
  .then(app => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch(error => console.log(error));
