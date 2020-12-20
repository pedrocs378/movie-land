import { Router } from 'express'

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes'
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes'
import watchListRouter from '../../../../modules/watchlist/infra/http/routes/watchlist.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/watchlist', watchListRouter)

export default routes
