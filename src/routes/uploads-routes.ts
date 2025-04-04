import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '../configs/upload'

import { UploadsController } from '../controllers/uploads-controller'
import { verifyUserAuthorization } from '../middlewares/veirfy-user-authorization'

export const uploadsRouter = Router()
const uploadsController = new UploadsController()

const upload = multer(uploadConfig.MULTER)

uploadsRouter.use(verifyUserAuthorization(['employee']))
uploadsRouter.post('/', upload.single('file'), uploadsController.create)
