import { UsersRepos } from '@/repos/users-repos'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthUseCaseRequest {
  email: string
  password: string
}
interface AuthUseCaseResponse {
  user: User
}
export class AuthUseCase {
  constructor(private usersRepos: UsersRepos) {}

  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const user = await this.usersRepos.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await compare(password, user.password_hash)
    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }
    return {
      user,
    }
  }
}
