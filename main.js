const config = require('./config');
const models = require('./models');

console.log(config.name);

const user = new models.user();
const product = new models.product();
