import { inject, injectable } from 'tsyringe'

import WatchList from '../infra/typeorm/entities/WatchList'
import IWatchListRepository from '../repositories/IWatchListRepository'

@injectable()
class DeleteWatchListService {

	constructor(
		@inject('WatchListRepository')
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
