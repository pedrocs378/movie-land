import WatchList from '../infra/typeorm/entities/WatchList'
import IWatchListRepository from '../repositories/IWatchListRepository'

class ShowWatchListService {

	constructor(
		private watchListRepository: IWatchListRepository
	) { }

	public async execute(user_id: string): Promise<WatchList[]> {

		const movie = await this.watchListRepository.findByUserId(user_id)

		return movie

	}
}

export default ShowWatchListService
