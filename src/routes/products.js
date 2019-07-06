const routes = require('express').Router();

const ProductsController = require('../app/controllers/ProductsController');

const ProductsSchema = require('./schemas/ProductsSchema');

const authMiddleware = require('../app/middlewares/auth');
const verifyPermissions = require('../app/middlewares/verifyPermissions');

routes.get('/:id', ProductsSchema.show, ProductsController.show);

routes.use(authMiddleware);
routes.use(verifyPermissions.lowPermission);

routes.post('/', ProductsSchema.store, ProductsController.store);
routes.put('/:id', ProductsSchema.update, ProductsController.update);
routes.delete('/:id', ProductsSchema.destroy, ProductsController.destroy);

routes.use(verifyPermissions.highPermission);

routes.get('/', ProductsSchema.index, ProductsController.index);

module.exports = routes;
