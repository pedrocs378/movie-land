import { Router } from 'express'
import { getRepository } from 'typeorm'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateWatchListService from '../services/CreateWatchListService'
import WatchList from '../models/WatchList'
import AppError from '../errors/AppError'

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

watchListRouter.get('/:movie_id', async (request, response) => {
	const { movie_id } = request.params

	const watchListRepository = getRepository(WatchList)

	const movie = await watchListRepository.findOne({
		where: {
			movie_id
		}
	})

	if (movie) {
		return response.json({
			movie_id,
			found: true
		})
	} else {
		return response.json({
			movie_id,
			found: false
		})
	}
})

watchListRouter.delete('/', async (request, response) => {
	const { movie_id } = request.body

	const watchListRepository = getRepository(WatchList)

	const movie = await watchListRepository.findOne({
		where: {
			user_id: request.user.id,
			movie_id
		}
	})

	if (movie) {
		await watchListRepository.delete(movie)

		return response.json(movie)
	} else {
		throw new AppError('Movie not fount')
	}

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
