import { PrismaUsersRepos } from '@/repos/prisma/prisma-users-repos'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepos = new PrismaUsersRepos()
  const registerUseCase = new RegisterUseCase(usersRepos)

  return registerUseCase
}
