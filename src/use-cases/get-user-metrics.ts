import { CheckInsRepos } from '@/repos/check-ins-repos'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}
export class GetUserMetricsUseCase {
  constructor(private checkInsRepos: CheckInsRepos) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepos.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
