import { Router } from 'express'
import { RefundsController } from '../controllers/refund-controller'
import { verifyUserAuthorization } from '../middlewares/veirfy-user-authorization'

export const refundsRouter = Router()
const refundsController = new RefundsController()

refundsRouter.post(
  '/',
  verifyUserAuthorization(['employee']),
  refundsController.create,
)

refundsRouter.get(
  '/',
  verifyUserAuthorization(['manager']),
  refundsController.index,
)

refundsRouter.get(
  '/:id',
  verifyUserAuthorization(['employee', 'manager']),
  refundsController.show,
)
