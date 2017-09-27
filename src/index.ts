// have to use require because ts compiler can not import this
import { config } from './config';

import { User, Product } from './models';

console.log(config.name);

const user = new User();
const product = new Product();
