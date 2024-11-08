import { Prisma, Gym } from '@prisma/client'

export interface GymsRepos {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
