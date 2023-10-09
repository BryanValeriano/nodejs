import { FastifyInstance } from 'fastify';
import { registerUserController } from './controllers/registerUser.controller';

// eslint-disable-next-line @typescript-eslint/require-await
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController);
}
