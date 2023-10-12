import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUserUseCase } from '../authenticateUserUseCase';

export function makeauthenticateUserUseCase(): AuthenticateUserUseCase {
  const userRepository = new PrismaUsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  return authenticateUserUseCase;
}
