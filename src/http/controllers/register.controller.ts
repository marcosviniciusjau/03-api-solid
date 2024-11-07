import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRepos } from '@/repos/prisma/prisma-users-repos'
import { UserExistsError } from '@/use-cases/errors/user-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepos = new PrismaUserRepos()
    const registerUseCase = new RegisterUseCase(usersRepos)
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
  return reply.status(201).send()
}
