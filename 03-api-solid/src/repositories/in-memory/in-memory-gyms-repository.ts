import { Gym } from '@prisma/client';
import { IGymsRepository } from '../IGymsRepository';

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = await this.gyms.find((gym) => gym.id == id);
    return (!gym ? null : gym);
  }
}
