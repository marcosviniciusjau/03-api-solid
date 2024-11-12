import { PrismaCheckInsRepos } from '@/repos/prisma/prisma-check-ins-repos'
import { CheckInUseCase } from '../check-in'
import { PrismaGymsRepos } from '@/repos/prisma/prisma-gyms-repos'

export function makeCheckInUseCase() {
  const checkInsRepos = new PrismaCheckInsRepos()
  const gymsRepos = new PrismaGymsRepos()
  const useCase = new CheckInUseCase(checkInsRepos, gymsRepos)

  return useCase
}
