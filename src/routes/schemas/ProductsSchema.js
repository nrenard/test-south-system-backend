const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const RouteValidator = require('./RouteValidator');


class OfficialsSchema extends RouteValidator {
  static get show() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.objectId().required(),
      }),
    };

    return this.validate(schema);
  }

  static get index() {
    const schema = {
      body: Joi.object().keys({
        price_min: Joi.number(),
        price_max: Joi.number(),
        page: Joi.number(),
        title: Joi.string(),
      }),
    };

    return this.validate(schema);
  }

  static get store() {
    const schema = {
      body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        status: Joi.boolean(),
      }),
    };

    return this.validate(schema);
  }

  static get update() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.objectId().required(),
      }),
      body: Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        status: Joi.boolean(),
      }),
    };

    return this.validate(schema);
  }

  static get destroy() {
    const schema = {
      params: Joi.object().keys({
        id: Joi.objectId().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = OfficialsSchema;
