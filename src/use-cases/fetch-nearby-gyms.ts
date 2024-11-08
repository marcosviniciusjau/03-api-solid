import { GymsRepos } from '@/repos/gym-repos'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsUseCaseRequest {
  latitude: number
  longitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepos: GymsRepos) {}
  async execute({
    latitude,
    longitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepos.findManyNearby({
      latitude,
      longitude,
    })

    return {
      gyms,
    }
  }
}
