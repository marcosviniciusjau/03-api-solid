import { CheckIn } from '@prisma/client'
import { CheckInsRepos } from '@/repos/check-ins-repos'
import { GymsRepos } from '@/repos/gym-repos'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { getDistance } from '@/utils/get-distance'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}
export class CheckInUseCase {
  constructor(
    private checkInsRepos: CheckInsRepos,
    private gymsRepos: GymsRepos,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepos.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistance(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )
    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }
    const checkInOnSameDay = await this.checkInsRepos.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }
    const checkIn = await this.checkInsRepos.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
