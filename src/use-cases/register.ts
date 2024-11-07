import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCase {
  name: string
  email: string
  password: string
}
export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCase) {
  const password_hash = await hash(password, 6)

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    throw new Error('User already exists!')
  }
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
