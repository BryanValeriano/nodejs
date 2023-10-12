import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUserUseCase } from '@/use-cases/factories/makeRegisterUserUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = requestBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUserUseCase();
    await registerUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send(err.message);
    }
    throw err;
  }

  return reply.status(201).send();
}
