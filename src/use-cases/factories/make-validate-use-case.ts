import { PrismaCheckInsRepos } from '@/repos/prisma/prisma-check-ins-repos'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepos = new PrismaCheckInsRepos()
  const useCase = new ValidateCheckInUseCase(checkInsRepos)

  return useCase
}
