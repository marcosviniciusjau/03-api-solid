import { UsersRepos } from '@/repos/users-repos'
import { hash } from 'bcryptjs'
import { UserExistsError } from './errors/user-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersRepos: UsersRepos) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userExists = await this.usersRepos.findByEmail(email)

    if (userExists) {
      throw new UserExistsError()
    }

    const user = await this.usersRepos.create({
      name,
      email,
      password_hash,
    })
    return {
      user,
    }
  }
}
