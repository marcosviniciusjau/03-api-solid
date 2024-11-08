import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { profile } from './controllers/profile'
import { auth } from './controllers/auth'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions', auth)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
