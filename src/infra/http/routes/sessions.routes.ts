import { Router } from 'express'

import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'

import { makeSignInController } from '../factories/controllers/Authentication/SignInControllerFactory'

const sessionsRouter = Router()

sessionsRouter.post('/', adaptRoute(makeSignInController()))

export { sessionsRouter }
