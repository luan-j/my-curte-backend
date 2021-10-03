import { Router } from 'express'

import { postsRouter } from './posts.routes'
import { sessionsRouter } from './sessions.routes'
import { usersRouter } from './users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)
router.use('/posts', postsRouter)

export { router }
