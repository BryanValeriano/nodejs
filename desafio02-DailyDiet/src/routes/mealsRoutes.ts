import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { getMealParamsSchema, postMealBodySchema } from '../schemas/routesSchemas';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

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

    const id = randomUUID();

    await knex('meals').insert({
      id,
      title,
      description,
      date,
      isDiet,
      ownerId: sessionId,
    });

    return reply.status(201).send({ id });
  });

  app.get('/:id', {
    preHandler: [checkSessionIdExists],
  }, async (request) => {
    const { id } = getMealParamsSchema.parse(request.params);
    const { sessionId } = request.cookies;

    const meals = await knex('meals').where({
      id,
      ownerId: sessionId,
    }).first();

    return { meals };
  });
}
