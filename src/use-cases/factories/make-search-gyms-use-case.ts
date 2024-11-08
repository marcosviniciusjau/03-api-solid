import { PrismaGymsRepos } from '@/repos/prisma/prisma-gyms-repos'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymUseCase() {
  const gymsRepos = new PrismaGymsRepos()
  const useCase = new SearchGymsUseCase(gymsRepos)

  return useCase
}
