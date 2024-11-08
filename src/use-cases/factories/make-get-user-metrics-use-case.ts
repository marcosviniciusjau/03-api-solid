import { PrismaCheckInsRepos } from '@/repos/prisma/prisma-check-ins-repos'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepos = new PrismaCheckInsRepos()
  const useCase = new GetUserMetricsUseCase(checkInsRepos)

  return useCase
}
