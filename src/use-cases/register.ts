import { UsersRepos } from '@/repos/users-repos'
import { hash } from 'bcryptjs'
import { UserExistsError } from './errors/user-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
export class RegisterUseCase {
  constructor(private usersRepos: UsersRepos) {}
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userExists = await this.usersRepos.findByEmail(email)

    if (userExists) {
      throw new UserExistsError()
    }

    await this.usersRepos.create({
      name,
      email,
      password_hash,
    })
  }
}
