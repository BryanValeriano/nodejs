import { Gym } from '@prisma/client';
import { IGymsRepository } from '../IGymsRepository';

export class InMemoryGymsRepository implements IGymsRepository {
  public Gyms: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const Gym = await this.Gyms.find((Gym) => Gym.id == id);
    return (!Gym ? null : Gym);
  }
}
