import WatchList from '../infra/typeorm/entities/WatchList'
import IWatchListRepository from '../repositories/IWatchListRepository'

class DeleteWatchListService {

	constructor(
		private watchListRepository: IWatchListRepository
	) { }

	public async execute(movie_id: number): Promise<WatchList | undefined> {

		const movie = await this.watchListRepository.findByMovieId(movie_id)

		if (movie) {
			await this.watchListRepository.delete(movie)

			return movie
		} else {
			return undefined
		}

	}
}

export default DeleteWatchListService
