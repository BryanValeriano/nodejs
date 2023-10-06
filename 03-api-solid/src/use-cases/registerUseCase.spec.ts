import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './registerUseCase';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

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

  it('Shoud not be able to register with same email twice', async () => {
    const repository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(repository);

    const password = 'passwordSecret';
    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password
    });

    expect(() => registerUseCase.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password
    })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
