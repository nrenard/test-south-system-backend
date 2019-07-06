const routes = require('express').Router();

const OfficialsController = require('../app/controllers/OfficialsController');

const OfficialsSchema = require('./schemas/OfficialsSchema');

const verifyPermissions = require('../app/middlewares/verifyPermissions');
const authMiddleware = require('../app/middlewares/auth');

routes.post('/', OfficialsSchema.store, OfficialsController.store);

routes.get('/', authMiddleware, verifyPermissions.highPermission, OfficialsController.index);

module.exports = routes;
