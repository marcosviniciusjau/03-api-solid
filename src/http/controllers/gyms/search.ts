import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().default(1),
  })

  const { q, page } = searchGymQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymUseCase()
  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  })
  return reply.status(200).send({
    gyms,
  })
}
