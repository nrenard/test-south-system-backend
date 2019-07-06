const faker = require('faker');
const { factory } = require('factory-girl');
const Officials = require('../src/app/models/Officials');

factory.define('Official', Officials, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  permissions: 2,
});

module.exports = factory;
