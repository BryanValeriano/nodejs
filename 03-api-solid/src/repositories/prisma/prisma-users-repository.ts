import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }

  async create({
    name,
    email,
    password_hash
  }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    });
    return user;
  }
}
