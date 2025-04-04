import { Router } from 'express'
import { SessionsController } from '../controllers/sessions-controller'

export const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post('/', sessionsController.create)
