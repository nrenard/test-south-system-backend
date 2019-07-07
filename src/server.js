require('./config/env');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

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
    if (!this.isTest) this.express.use(morgan(this.isDev ? 'dev' : 'common'));
  }

  database() {
    if (!this.isTest) {
      mongoose.connect(
        process.env.DB_URL,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
        },
      );
    }
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new Server().express;
