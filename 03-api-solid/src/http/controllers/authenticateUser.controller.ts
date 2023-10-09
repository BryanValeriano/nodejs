import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUserUseCase } from '@/use-cases/authenticateUserUseCase';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticateUserController(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = requestBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    await authenticateUserUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send(err.message);
    }
    throw err;
  }

  return reply.status(200).send();
}
