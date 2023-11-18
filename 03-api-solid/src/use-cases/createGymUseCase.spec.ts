import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { IGymsRepository } from '@/repositories/IGymsRepository';
import { CreateGymUseCase } from './createGymUseCase';

let gymsRepository: IGymsRepository;
let sut: CreateGymUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('shoud be able to create gym', async () => {
    const { gym } = await sut.execute({
      id: 'gym-01',
      title: 'test',
      description: 'test',
      phone: 'test',
      latitude: 0,
      longitude: 0,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
