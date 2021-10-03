import { Router } from 'express'

import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'

import { makeSignUpController } from '../factories/controllers/Authentication/SignUpControllerFactory'
import { makeCreateUserFollowController } from '../factories/controllers/Users/CreateUserFollowControllerFactory'
import { makeGetUsersToFollowController } from '../factories/controllers/Users/GetUsersToFollowControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const usersRouter = Router()

usersRouter.post('/', adaptRoute(makeSignUpController()))

usersRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

usersRouter.get(
  '/recommendations',
  adaptRoute(makeGetUsersToFollowController())
)

usersRouter.post('/follow', adaptRoute(makeCreateUserFollowController()))

export { usersRouter }
