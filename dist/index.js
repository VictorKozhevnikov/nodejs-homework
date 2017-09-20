"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// have to use require because ts compiler can not import this
const config_1 = require("./config");
const models_1 = require("./models");
console.log(config_1.config.name);
const user = new models_1.User();
const product = new models_1.Product();
