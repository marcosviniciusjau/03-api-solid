import { PrismaGymsRepos } from '@/repos/prisma/prisma-gyms-repos'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepos = new PrismaGymsRepos()
  const useCase = new CreateGymUseCase(gymsRepos)

  return useCase
}
