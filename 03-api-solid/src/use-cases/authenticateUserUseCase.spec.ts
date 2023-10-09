import { describe, expect, it } from 'vitest';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
  it('shoud be able to register', async () => {
    const repository = new InMemoryUsersRepository();
    const sut = new AuthenticateUserUseCase(repository);
    const password = 'passwordSecret';

    await repository.create({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash(password, 6),
    });

    const { user } = await sut.execute({
      email: 'johnDoe@gmail.com',
      password
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('shoud not be able to authenticate with non-existent email', async () => {
    const repository = new InMemoryUsersRepository();
    const sut = new AuthenticateUserUseCase(repository);
    const password = 'passwordSecret';

    await expect(async () => await sut.execute({
      email: 'johnDoe@gmail.com',
      password
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('shoud not be able to authenticate with wrond passwod', async () => {
    const repository = new InMemoryUsersRepository();
    const sut = new AuthenticateUserUseCase(repository);
    const password = 'passwordSecret';

    await repository.create({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash(password + 'salt', 6),
    });

    await expect(async () => await sut.execute({
      email: 'johnDoe@gmail.com',
      password
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
