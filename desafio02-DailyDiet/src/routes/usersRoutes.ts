import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { getUserParamsSchema, postUserBodySchema } from '../schemas/routesSchemas';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const {
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
      email,
    });

    return reply.status(201).send({ sessionId });
  });

  app.get('/:id', {
    preHandler: [checkSessionIdExists],
  }, async (request) => {
    const { id } = getUserParamsSchema.parse(request.params);
    // const { sessionId } = request.cookies;

    const user = await knex('users').where({
      id,
    }).first();

    return { user };
  });

  app.get('/:id/meals', {
    preHandler: [checkSessionIdExists],
  }, async (request) => {
    const { id } = getUserParamsSchema.parse(request.params);
    // const { sessionId } = request.cookies;

    const meals = await knex('meals').where({
      ownerId: id,
    });

    return { meals };
  });

  app.get('/:id/summary', {
    preHandler: [checkSessionIdExists],
  }, async (request) => {
    const { id } = getUserParamsSchema.parse(request.params);
    // const { sessionId } = request.cookies;

    const meals = await knex('meals').where({
      ownerId: id,
    });

    const summary = {
      qtdMeals: 0,
      qtdDietMeals: 0,
      qtdNoDietMeals: 0,
      bestDietStreak: 0,
    };

    let streak = 0;
    meals.forEach((meal) => {
      summary.qtdMeals += 1;
      if (meal.isDiet) {
        summary.qtdDietMeals += 1;
        streak += 1;
      } else {
        summary.qtdNoDietMeals += 1;
        streak = 0;
      }
      summary.bestDietStreak = Math.max(summary.bestDietStreak, streak);
    });

    return { summary };
  });
}
