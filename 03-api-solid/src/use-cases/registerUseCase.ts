import { IUsersRepository } from '@/repositories/IUsersRepository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseParams {
  name: string,
  email: string,
  password: string
}

export class RegisterUseCase {

  constructor(private usersRepository: IUsersRepository) { }

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseParams) {

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.');
    }

    this.usersRepository.create({ name, email, password_hash });
  }
}
