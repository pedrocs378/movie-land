import { Router } from 'express'
import { getRepository } from 'typeorm'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateWatchListService from '../services/CreateWatchListService'
import WatchList from '../models/WatchList'
import AppError from '../errors/AppError'

const watchListRouter = Router()

watchListRouter.use(ensureAuthenticated)

watchListRouter.get('/', async (request, response) => {
	const { user_id } = request.body

	const watchListRepository = getRepository(WatchList)

	const watchList = await watchListRepository.find({
		where: {
			user_id
		}
	})

	return response.json(watchList)
})

watchListRouter.post('/', async (request, response) => {
	const data = request.body

	try {
		const createWatchList = new CreateWatchListService()

		const movie = await createWatchList.execute({
			data,
			user_id: data.user_id
		})

		return response.json(movie)
	} catch (err) {
		throw new AppError(err)
	}
})

export default watchListRouter
