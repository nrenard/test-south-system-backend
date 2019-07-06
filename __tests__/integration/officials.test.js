const request = require('supertest');

const server = require('../../src/server');

const dbConnection = require('../utils/dbConnection');
const truncate = require('../utils/truncate');

describe('Officials', () => {
  beforeAll(async () => {
    console.log('beforeAll');
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

  it('should be able to find officials, with authenticated manager', async () => {
    const first = await request(server)
      .post('/officials')
      .send({
        email: 'teste2@gmail.com',
        name: 'Nicolas Renard',
        permissions: 2,
        password: '123456',
      });

    console.log('first: ', first.body);

    const second = await request(server)
      .post('/session')
      .send({
        email: first.email,
        password: '123456',
      });

    const third = await request(server)
      .get('/officials')
      .set('Authentication', `Bearer ${second.body.token}`);

    expect(third.status).toBe(200);
  });

  it('should be not able to find officials, with not authenticated.', async () => {
    const third = await request(server)
      .get('/officials');

    expect(third.status).toBe(401);
  });
});
