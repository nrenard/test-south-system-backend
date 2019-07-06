const routes = require('express').Router();

const SessionController = require('../app/controllers/SessionController');

const SessionSchema = require('./schemas/SessionSchema');

routes.post('/', SessionSchema.store, SessionController.store);

module.exports = routes;
