import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './registerUseCase';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

describe('Register Use Case', () => {
  it('Shoud hash user password upon registration', async () => {
    const repository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(repository);

    const password = 'passwordSecret';
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password
    });

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
