import { Router } from 'express'

import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import watchListRouter from './watchlist.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/watchlist', watchListRouter)

export default routes
