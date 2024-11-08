import { GymsRepos } from '@/repos/gym-repos'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  description?: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface CreateGymUseCaseResponse {
  gym: Gym
}
export class CreateGymUseCase {
  constructor(private gymsRepos: GymsRepos) {}
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepos.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}
