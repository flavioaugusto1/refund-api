import { Router } from 'express'
import { usersRouter } from './users-route'
import { sessionsRouter } from './sessions-routes'
import { refundsRouter } from './refunds-routes'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { uploadsRouter } from './uploads-routes'

export const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

// rotas privadas
routes.use(ensureAuthenticated)
routes.use('/refunds', refundsRouter)
routes.use('/uploads', uploadsRouter)
