import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUseCase } from '../registerUseCase';

export function makeRegisterUserUseCase(): RegisterUseCase {
  const userRepository = new PrismaUsersRepository();
  const registerUserUseCase = new RegisterUseCase(userRepository);
  return registerUserUseCase;
}
