import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { knex } from './database';
import { mealsRoutes } from './routes/mealsRoutes';
import { usersRoutes } from './routes/usersRoutes';

export const app = fastify();

app.register(cookie);

app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] ${request.url}`);
});

app.get('/hello', async () => {
  const test = await knex('sqlite_schema').select('*');
  return test;
});

app.register(mealsRoutes, {
  prefix: 'meals',
});

app.register(usersRoutes, {
  prefix: 'users',
});
