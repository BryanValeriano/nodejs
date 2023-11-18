import { Gym, Prisma } from '@prisma/client';
import { IGymsRepository } from '../IGymsRepository';
import { randomUUID } from 'node:crypto';

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = await this.gyms.find((gym) => gym.id == id);
    return (!gym ? null : gym);
  }

  async create({
    id,
    title,
    description,
    phone,
    latitude,
    longitude
  }: Prisma.GymCreateInput) {
    const gym = {
      id: id ?? randomUUID(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      created_at: new Date()
    };

    await this.gyms.push(gym);
    return gym;
  }
}
