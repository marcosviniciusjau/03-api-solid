import { UsersRepos } from '@/repos/users-repos'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: User
}
export class GetUserProfileUseCase {
  constructor(private usersRepos: UsersRepos) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepos.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
