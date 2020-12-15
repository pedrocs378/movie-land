import { getRepository } from 'typeorm'

import WatchList from '../models/WatchList'

interface Movie {
	id: number
	genre_id: number
	title: string
	year: string
	poster_path: string
	vote_average: number
}

interface Request {
	data: Movie
	user_id: string
}

class CreateWatchListService {

	public async execute({ data, user_id }: Request): Promise<WatchList> {
		const watchListRepository = getRepository(WatchList)

		const movie = watchListRepository.create({
			movie_id: data.id,
			genre_id: data.genre_id,
			title: data.title,
			poster_path: data.poster_path,
			year: data.year,
			vote_average: data.vote_average,
			user_id: user_id
		})

		await watchListRepository.save(movie)

		return movie

	}
}

export default CreateWatchListService
