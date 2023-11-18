import { ICheckInsRepository } from '@/repositories/ICheckInsRepository';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { CreateCheckInUseCase } from './createCheckInUseCase';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { IGymsRepository } from '@/repositories/IGymsRepository';

let checkInsRepository: ICheckInsRepository;
let gymsRepository: IGymsRepository;
let sut: CreateCheckInUseCase;

describe('Create Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    await gymsRepository.create({
      id: 'gym-01',
      title: 'test',
      description: 'test',
      phone: 'test',
      latitude: 0,
      longitude: 0,
    });
    sut = new CreateCheckInUseCase(checkInsRepository, gymsRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shoud be able to create a check in', async () => {
    const { checkIn } = await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('shoud not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    });
    await expect(async () => await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })).rejects.toBeInstanceOf(Error);
  });

  it('shoud be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute({
      gym_id: 'gym-01',
      user_id: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('shoud not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await gymsRepository.create({
      id: 'gym-02',
      title: 'test',
      description: 'test',
      phone: 'test',
      latitude: new Decimal(-23.5796246),
      longitude: new Decimal(-46.6949737),
    });

    await expect(async () => await sut.execute({
      gym_id: 'gym-02',
      user_id: 'user-01',
      userLatitude: -23.5614175,
      userLongitude: -46.6868709,
    })).rejects.toBeInstanceOf(Error);
  });
});
