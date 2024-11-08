import { CheckIn } from '@prisma/client'
import { CheckInsRepos } from '@/repos/check-ins-repos'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}
export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepos: CheckInsRepos) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepos.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
