import { injectable, inject } from 'tsyringe'

import WatchList from '../infra/typeorm/entities/WatchList'
import IWatchListRepository from '../repositories/IWatchListRepository'

interface Movie {
	id: number
	genre: string
	title: string
	year: number
	poster_path: string
	vote_average: number
}

interface Request {
	data: Movie
	user_id: string
}

@injectable()
class CreateWatchListService {

	constructor(
		@inject('WatchListRepository')
		private watchListRepository: IWatchListRepository
	) {}

	public async execute({ data, user_id }: Request): Promise<WatchList> {

		const movie = await this.watchListRepository.create({
			movie_id: data.id,
			genre: data.genre,
			poster_path: data.poster_path,
			year: data.year,
			title: data.title,
			vote_average: data.vote_average,
			user_id
		})

		return movie

	}
}

export default CreateWatchListService
