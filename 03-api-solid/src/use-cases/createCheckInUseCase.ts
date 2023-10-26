import { ICheckInsRepository } from '@/repositories/ICheckInsRepository';
import { CheckIn } from '@prisma/client';

interface CreateCheckInUseCaseRequest {
  gym_id: string,
  user_id: string
}

interface CreateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CreateCheckInUseCase {

  constructor(private checkInRepository: ICheckInsRepository) { }

  async execute({
    gym_id,
    user_id
  }: CreateCheckInUseCaseRequest): Promise<CreateCheckInUseCaseResponse> {

    const checkIn = await this.checkInRepository.create({
      gym_id,
      user_id
    });

    return { checkIn };
  }
}
