import { PrismaCheckInsRepos } from '@/repos/prisma/prisma-check-ins-repos'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepos = new PrismaCheckInsRepos()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepos)

  return useCase
}
