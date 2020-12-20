import { Request, Response } from "express";
import { container } from 'tsyringe'

import AppError from "../../../../../shared/errors/AppError";
import CreateWatchListService from "../../../services/CreateWatchListService";
import DeleteWatchListService from "../../../services/DeleteWatchListService";
import ShowWatchListService from "../../../services/ShowWatchListService";
import WatchListRepository from "../../typeorm/repositories/WatchListRepository";

class WatchListController {

	public async create(request: Request, response: Response): Promise<Response> {
		const data = request.body

		const createWatchList = container.resolve(CreateWatchListService)

		const movie = await createWatchList.execute({
			data,
			user_id: request.user.id
		})

		return response.json(movie)
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const showWatchList = container.resolve(ShowWatchListService)

		const watchList = await showWatchList.execute(request.user.id)

		return response.json(watchList)
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const { movie_id } = request.params

		const watchListRepository = new WatchListRepository()

		const movie = await watchListRepository.findByMovieId(Number(movie_id))

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
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { movie_id } = request.body

		const deleteWatchList = container.resolve(DeleteWatchListService)

		const movie = await deleteWatchList.execute(movie_id)

		if (movie) {
			return response.json(movie)
		} else {
			throw new AppError('Movie not fount')
		}
	}
}

export default WatchListController
