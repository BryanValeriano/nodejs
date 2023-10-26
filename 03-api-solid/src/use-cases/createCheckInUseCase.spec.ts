import { ICheckInsRepository } from '@/repositories/ICheckInsRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCheckInUseCase } from './createCheckInUseCase';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository';

let checkInsRepository: ICheckInsRepository;
let sut: CreateCheckInUseCase;

describe('Create Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CreateCheckInUseCase(checkInsRepository);
  });

  it('shoud be able to create a check in', async () => {
    const { checkIn } = await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
