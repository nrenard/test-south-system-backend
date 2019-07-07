const Joi = require('joi');
const RouteValidator = require('./RouteValidator');

class OfficialsSchema extends RouteValidator {
  static get store() {
    const schema = {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        permissions: Joi.number().max(2).required(),
        password: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = OfficialsSchema;
