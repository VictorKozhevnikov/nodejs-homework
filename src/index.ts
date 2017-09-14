// have to use require because ts compiler can not import this
const config = require('./config');
// import * as config from './config';

import { User, Product } from './models';

console.log(config.name);

const user = new User();
const product = new Product();
