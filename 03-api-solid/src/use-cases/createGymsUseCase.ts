import { IGymsRepository } from '@/repositories/IGymsRepository';
import { Gym } from '@prisma/client';
import { randomUUID } from 'node:crypto';

interface CreateGymUseCaseRequest {
  id: string | null,
  title: string,
  description: string | null,
  phone: string | null,
  latitude: number,
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) { }
  async execute({
    id,
    title,
    description,
    phone,
    latitude,
    longitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

    const gym = await this.gymsRepository.create({
      id: id ?? randomUUID(),
      title,
      description,
      phone,
      latitude,
      longitude
    });

    return { gym };
  }
}
