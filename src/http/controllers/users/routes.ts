import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { auth } from './auth'
import { refresh } from './refresh'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions', auth)

  app.patch('/token/refresh', refresh)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
