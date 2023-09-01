import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { postMealBodySchema } from '../schemas/routesSchemas';

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const {
      title,
      description,
      date,
      isDiet,
    } = postMealBodySchema.parse(request.body);

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

    await knex('meals').insert({
      id: randomUUID(),
      title,
      description,
      date,
      isDiet,
      ownerId: sessionId,
    });

    return reply.status(201).send();
  });
}
