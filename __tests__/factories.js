const faker = require('faker');
const { factory } = require('factory-girl');
const Officials = require('../src/app/models/Officials');
const Products = require('../src/app/models/Products');

factory.define('Official', Officials, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  permissions: 2,
});

factory.define('Product', Products, {
  title: faker.lorem.words(),
  description: faker.lorem.paragraphs(),
  price: 1000,
  author: null,
});


module.exports = factory;
