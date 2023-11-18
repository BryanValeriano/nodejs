import { ICheckInsRepository } from '@/repositories/ICheckInsRepository';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { CreateCheckInUseCase } from './createCheckInUseCase';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository';

let checkInsRepository: ICheckInsRepository;
let sut: CreateCheckInUseCase;

describe('Create Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CreateCheckInUseCase(checkInsRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shoud be able to create a check in', async () => {
    const { checkIn } = await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('shoud not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });
    await expect(async () => await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })).rejects.toBeInstanceOf(Error);
  });

  it('shoud be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
