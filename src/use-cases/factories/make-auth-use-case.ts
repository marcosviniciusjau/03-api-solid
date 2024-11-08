import { PrismaUsersRepos } from '@/repos/prisma/prisma-users-repos'
import { AuthUseCase } from '../auth'

export function makeAuthUseCase() {
  const usersRepos = new PrismaUsersRepos()
  const authUseCase = new AuthUseCase(usersRepos)

  return authUseCase
}
