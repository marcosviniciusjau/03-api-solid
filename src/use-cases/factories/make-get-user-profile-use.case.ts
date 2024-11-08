import { PrismaUsersRepos } from '@/repos/prisma/prisma-users-repos'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepos = new PrismaUsersRepos()
  const useCase = new GetUserProfileUseCase(usersRepos)

  return useCase
}
