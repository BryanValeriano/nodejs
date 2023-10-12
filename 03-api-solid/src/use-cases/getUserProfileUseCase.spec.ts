import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserProfileUseCase } from './getUserProfileUseCase';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '@/repositories/IUsersRepository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: IUsersRepository;
let sut: GetUserProfileUseCase;
let password: string;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
    password = 'passwordSecret';
  });

  it('shoud be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash(password, 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.id).toEqual(createdUser.id);
    expect(user.name).toEqual('John Doe');
  });

  it('shoud not be able to get user profile with wrong id', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash(password, 6),
    });

    await expect(async () =>
      await sut.execute({
        userId: 'non-existing-id'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
