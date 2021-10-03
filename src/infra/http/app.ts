import cors from 'cors'
import { config } from 'dotenv-flow'
import express from 'express'

config({ silent: true })

import { apolloServer } from './graphql/apolloServer'
import { router } from './routes'

const app = express()

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  })
)

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  })
)

apolloServer(app)

app.use(router)

export { app }
