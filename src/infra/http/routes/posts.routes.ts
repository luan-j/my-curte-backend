import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@config/upload'
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'

import { makeCreatePostController } from '../factories/controllers/Posts/CreatePostControllerFactory'
import { makeGetPostsFeedController } from '../factories/controllers/Posts/GetPostsFeedControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const postsRouter = Router()

postsRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

const uploadImage = multer(uploadConfig)

postsRouter.post(
  '/',
  uploadImage.single('image_source'),
  adaptRoute(makeCreatePostController())
)

postsRouter.get('/feed', adaptRoute(makeGetPostsFeedController()))

export { postsRouter }
