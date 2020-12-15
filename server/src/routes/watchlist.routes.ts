import { Router } from 'express'
import { getRepository } from 'typeorm'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateWatchListService from '../services/CreateWatchListService'
import WatchList from '../models/WatchList'

const watchListRouter = Router()

watchListRouter.use(ensureAuthenticated)

watchListRouter.get('/', async (request, response) => {
	const watchListRepository = getRepository(WatchList)

	const watchList = await watchListRepository.find({
		where: {
			user_id: request.user.id
		}
	})

	return response.json(watchList)
})

watchListRouter.post('/', async (request, response) => {
	const data = request.body

	const createWatchList = new CreateWatchListService()

	const movie = await createWatchList.execute({
		data,
		user_id: request.user.id
	})

	return response.json(movie)
})

export default watchListRouter
