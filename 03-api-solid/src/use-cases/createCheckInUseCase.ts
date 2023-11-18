import { ICheckInsRepository } from '@/repositories/ICheckInsRepository';
import { IGymsRepository } from '@/repositories/IGymsRepository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

interface CreateCheckInUseCaseRequest {
  gym_id: string,
  user_id: string,
  userLatitude: number,
  userLongitude: number,
}

interface CreateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CreateCheckInUseCase {
  constructor(private checkInRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository) { }

  async execute({
    gym_id,
    user_id,
    userLatitude,
    userLongitude
  }: CreateCheckInUseCaseRequest): Promise<CreateCheckInUseCaseResponse> {

    const gym = await this.gymsRepository.findById(gym_id);
    console.log(gym);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(user_id, new Date());
    if (checkInOnSameDay) {
      throw new Error();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error();
    }

    const checkIn = await this.checkInRepository.create({
      gym_id,
      user_id
    });

    return { checkIn };
  }
}
