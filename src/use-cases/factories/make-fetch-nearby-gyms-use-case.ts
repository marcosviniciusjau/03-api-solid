import { PrismaGymsRepos } from '@/repos/prisma/prisma-gyms-repos'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearByGymsUseCase() {
  const gymsRepos = new PrismaGymsRepos()
  const useCase = new FetchNearbyGymsUseCase(gymsRepos)

  return useCase
}
