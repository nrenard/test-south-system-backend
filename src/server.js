require('./config/env');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

class Server {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV === 'development';
    this.isTest = process.env.NODE_ENV === 'test';

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());

    if (!this.isTest) {
      this.express.use(morgan(this.isDev ? 'dev' : 'common'));

      // swagger config
      const options = { customCss: '.swagger-ui .try-out { display: none }' };
      this.express.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    }
  }

  database() {
    if (!this.isTest) {
      mongoose.connect(process.env.DB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
      });
    }
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new Server().express;
