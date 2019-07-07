const request = require('supertest');

const server = require('../../src/server');

const factory = require('../factories');
const dbConnection = require('../utils/dbConnection');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  const password = '123456';

  beforeAll(async () => {
    dbConnection();
    await truncate();
  });

  it('should be able to authenticate with valid credentials', async () => {
    const official = await factory.create('Official', {
      password,
    });

    const response = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password,
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to authenticate with invalid credentials', async () => {
    const official = await factory.create('Official', {
      password,
    });

    const response = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password: '123123s',
      });

    expect(response.status).toBe(401);
  });

  it('should be return user not found', async () => {
    const response = await request(server)
      .post('/session')
      .send({
        email: 'teste',
        password: 'teste',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const official = await factory.create('Official', {
      password,
    });

    const response = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to acess private routes when autheticated', async () => {
    const official = await factory.create('Official', {
      password,
    });

    const authenticated = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password,
      });

    const response = await request(server)
      .get('/products')
      .set('Authorization', `Bearer ${authenticated.body.token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to acess private routes when not autheticated', async () => {
    const response = await request(server).get('/products');
    expect(response.status).toBe(401);
  });

  it('should not be able to acess private routes when not autheticated', async () => {
    const response = await request(server)
      .get('/products')
      .set('Authorization', 'Bearer 123123');

    expect(response.status).toBe(401);
  });

  it('should not be able to acess private routes when not has permission.', async () => {
    const official = await request(server)
      .post('/officials')
      .send({
        name: 'Collaborator',
        email: 'collaborator@teste.com',
        permissions: 1,
        password,
      });

    const authenticated = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password,
      });

    const response = await request(server)
      .get('/products')
      .set('Authorization', `Bearer ${authenticated.body.token}`);

    expect(response.status).toBe(401);
  });
});
