import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { postUserBodySchema } from '../schemas/routesSchemas';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const {
      name,
      email,
    } = postUserBodySchema.parse(request.body);

    let { sessionId } = request.cookies;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
      await knex('users').insert({
        id: sessionId,
      });
    }

    await knex('users').where({ id: sessionId }).update({
      name,
      email,
    });

    return reply.status(201).send();
  });
}
