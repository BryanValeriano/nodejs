import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUserUseCase } from '../authenticateUserUseCase';

export function makeAuthenticateUserUseCase(): AuthenticateUserUseCase {
  const userRepository = new PrismaUsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  return authenticateUserUseCase;
}
