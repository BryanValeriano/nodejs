import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import {
  getMealParamsSchema, postMealBodySchema, putMealBodySchema, putMealsParamsSchema,
} from '../schemas/routesSchemas';
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

  app.put('/:id', {
    preHandler: [checkSessionIdExists],
  }, async (request, reply) => {
    const updatedMeal = putMealBodySchema.parse(request.body);
    const { id } = putMealsParamsSchema.parse(request.params);
    const { sessionId } = request.cookies;

    const meal = await knex('meals').where({ id, ownerId: sessionId }).first();
    if (!meal) return reply.status(400).send();

    Object.assign(meal, updatedMeal);
    await knex('meals').where({ id, ownerId: sessionId }).update(updatedMeal);

    return reply.status(200).send({ meal });
  });

  app.delete('/:id', {
    preHandler: [checkSessionIdExists],
  }, async (request, reply) => {
    const { id } = getMealParamsSchema.parse(request.params);
    const { sessionId } = request.cookies;

    await knex('meals').where({
      id,
      ownerId: sessionId,
    }).delete();

    return reply.status(200).send();
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
