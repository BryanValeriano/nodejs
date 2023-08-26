import { test, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test('User can create a new transaction', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'Test transaction',
      amount: 200,
      type: 'credit',
    })
    .expect(201);
});
