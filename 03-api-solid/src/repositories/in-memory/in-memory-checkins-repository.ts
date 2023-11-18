import { Prisma, CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '../ICheckInsRepository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date');
    const endOfDay = dayjs(date).endOf('date');

    return this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);
      return isOnSameDate && checkIn.user_id === userId;
    }) ?? null;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    };
    await this.checkIns.push(checkIn);
    return checkIn;
  }
}
