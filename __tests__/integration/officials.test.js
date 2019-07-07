const request = require('supertest');

const server = require('../../src/server');

const factory = require('../factories');
const dbConnection = require('../utils/dbConnection');
const truncate = require('../utils/truncate');

describe('Officials', () => {
  beforeAll(async () => {
    dbConnection();
    await truncate();
  });

  it('should be able create new official', async () => {
    const response = await request(server)
      .post('/officials')
      .send({
        email: 'nicolasrenard1999@gmail.com',
        name: 'Nicolas Renard',
        permissions: 1,
        password: '123456',
      });

    expect(response.status).toBe(200);
  });

  it('should be not able create two officials for one email', async () => {
    await request(server)
      .post('/officials')
      .send({
        email: 'nicolasrenard1999@gmail.com',
        name: 'Nicolas Renard',
        permissions: 1,
        password: '123456',
      });

    const second = await request(server)
      .post('/officials')
      .send({
        email: 'nicolasrenard1999@gmail.com',
        name: 'Nicolas Renard',
        permissions: 1,
        password: '123456',
      });

    expect(second.status).toBe(409);
  });

  it('should be not able create two officials managers', async () => {
    await request(server)
      .post('/officials')
      .send({
        email: 'teste1@gmail.com',
        name: 'Nicolas Renard',
        permissions: 2,
        password: '123456',
      });

    const second = await request(server)
      .post('/officials')
      .send({
        email: 'teste2@gmail.com',
        name: 'Nicolas Renard',
        permissions: 2,
        password: '123456',
      });

    expect(second.status).toBe(401);
  });

  it('should be able acess to officials', async () => {
    const official = await factory.create('Official', {
      password: '123456',
    });

    const authenticated = await request(server)
      .post('/session')
      .send({
        email: official.email,
        password: '123456',
      });

    const response = await request(server)
      .get('/officials')
      .set('Authorization', `Bearer ${authenticated.body.token}`);

    expect(response.status).toBe(200);
  });
});
