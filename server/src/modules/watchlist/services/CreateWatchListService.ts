import WatchList from '../infra/typeorm/entities/WatchList'
import IWatchListRepository from '../repositories/IWatchListRepository'

interface Movie {
	movie_id: number
	genre: string
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

	constructor(
		private watchListRepository: IWatchListRepository
	) {}

	public async execute({ data, user_id }: Request): Promise<WatchList> {

		const movie = await this.watchListRepository.create({
			...data,
			user_id
		})

		return movie

	}
}

export default CreateWatchListService
