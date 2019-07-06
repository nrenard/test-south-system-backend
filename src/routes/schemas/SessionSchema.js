const Joi = require('joi');
const RouteValidator = require('./RouteValidator');

class SessionSchema extends RouteValidator {
  static get store() {
    const schema = {
      body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }
}

module.exports = SessionSchema;
