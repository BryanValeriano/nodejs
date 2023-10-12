import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { IUsersRepository } from '@/repositories/IUsersRepository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: IUsersRepository;
let sut: AuthenticateUserUseCase;
let password: string;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(usersRepository);
    password = 'passwordSecret';
  });

  it('shoud be able to register', async () => {
    await usersRepository.create({
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
    await expect(async () => await sut.execute({
      email: 'johnDoe@gmail.com',
      password
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('shoud not be able to authenticate with wrond passwod', async () => {
    await usersRepository.create({
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
