import { Router } from 'express'

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'
import WatchListController from '../controllers/WatchListController'

const watchListRouter = Router()
const watchListController = new WatchListController()

watchListRouter.use(ensureAuthenticated)

watchListRouter.post('/', watchListController.create)
watchListRouter.get('/', watchListController.show)
watchListRouter.get('/:movie_id', watchListController.index)
watchListRouter.delete('/', watchListController.delete)

export default watchListRouter
