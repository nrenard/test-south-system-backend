const routes = require('express').Router();

const officials = require('./officials');
const session = require('./session');
const products = require('./products');

routes.use('/session', session);
routes.use('/products', products);

routes.use('/officials', officials);

module.exports = routes;
