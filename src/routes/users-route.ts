import { Router } from 'express'
import { UsersController } from '../controllers/users-controller'

export const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post('/', usersController.create)
