import { FastifyInstance } from 'fastify';
import { knex } from '../database';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transaction = await knex('transactions').insert({
      id: crypto.randomUUID(),
      title: 'Transacao teste',
      ammount: 1000,
    }).returning('*');
    return transaction;
  });
}
