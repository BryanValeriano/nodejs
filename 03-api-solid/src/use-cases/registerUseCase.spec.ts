import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './registerUseCase';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { IUsersRepository } from '@/repositories/IUsersRepository';

let usersRepository: IUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('shoud be able to register', async () => {

    const password = 'passwordSecret';
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password
    });

    expect(user.id).toEqual(expect.any(String));
  });


  it('shoud hash user password upon registration', async () => {
    const password = 'passwordSecret';
    const { user } = await sut.execute({
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

  it('should not be able to register with same email twice', async () => {
    const password = 'passwordSecret';
    await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password
    });

    await expect(() => sut.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password
    })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
