const request = require('supertest');

const server = require('../../src/server');

const factory = require('../factories');
const dbConnection = require('../utils/dbConnection');
const truncate = require('../utils/truncate');


describe('Product', () => {
  const password = '123456';

  beforeAll(async () => {
    dbConnection();
    await truncate();
  });

  it('should be not able create product with not authenticated', async () => {
    const response = await request(server)
      .post('/products')
      .send({
        title: 'Pasta de amendoim',
        description: 'Pasta de amendoim description',
        price: 1000,
      });

    expect(response.status).toBe(401);
  });

  it('should be able to create product with authenticated', async () => {
    const official = await factory.create('Official', { password });

    const authenticated = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password,
      });

    const response = await request(server)
      .post('/products')
      .send({
        title: 'Pasta de amendoim',
        description: 'Pasta de amendoim description',
        price: 1000,
      })
      .set('Authorization', `Bearer ${authenticated.body.token}`);

    expect(response.status).toBe(200);
  });

  it('should be able to view product without being authenticated', async () => {
    const official = await factory.create('Official');
    const product = await factory.create('Product', { author: official._id });

    const response = await request(server)
      .get(`/products/${product._id}`);

    expect(response.status).toBe(200);
  });

  it('should be able to view product without being authenticated', async () => {
    const official = await factory.create('Official');
    const product = await factory.create('Product', { author: official._id });

    const response = await request(server)
      .get(`/products/${product._id}`);

    expect(response.status).toBe(200);
  });

  it('should be able to edit product authenticated', async () => {
    const official = await factory.create('Official', { password });
    const product = await factory.create('Product', { author: official._id });

    const authenticated = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password,
      });

    const response = await request(server)
      .put(`/products/${product._id}`)
      .send({ title: 'test' })
      .set('Authorization', `Bearer ${authenticated.body.token}`);

    expect(response.status).toBe(200);
  });

  it('should be able to delete product authenticated', async () => {
    const official = await factory.create('Official', { password });
    const product = await factory.create('Product', { author: official._id });

    const authenticated = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password,
      });

    const response = await request(server)
      .delete(`/products/${product._id}`)
      .set('Authorization', `Bearer ${authenticated.body.token}`);

    expect(response.status).toBe(200);
  });

  it('should be able to find products with filters while authenticated', async () => {
    const official = await factory.create('Official', { password });

    const authenticated = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password,
      });

    const response = await request(server)
      .get('/products?page=1&title=teste&price_min=1&price_max=10')
      .set('Authorization', `Bearer ${authenticated.body.token}`);

    expect(response.status).toBe(200);
  });
});
