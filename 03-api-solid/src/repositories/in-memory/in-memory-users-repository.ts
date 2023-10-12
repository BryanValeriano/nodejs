import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = await this.users.find((user) => user.id == id);
    return (!user ? null : user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.users.find((user) => user.email == email);
    return (!user ? null : user);
  }

  async create({
    name,
    email,
    password_hash
  }: Prisma.UserCreateInput) {
    const user = {
      id: 'user',
      name,
      email,
      password_hash,
      created_at: new Date()
    };

    await this.users.push(user);
    return user;
  }
}
