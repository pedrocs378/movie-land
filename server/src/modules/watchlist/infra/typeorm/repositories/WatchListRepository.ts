import { getRepository, Repository } from "typeorm";

import ICreateWatchListDTO from "../../../dtos/ICreateWatchListDTO";
import IWatchListRepository from "../../../repositories/IWatchListRepository";
import WatchList from "../entities/WatchList";

class WatchListRepository implements IWatchListRepository {
	private ormRepository: Repository<WatchList>

	constructor() {
		this.ormRepository = getRepository(WatchList)
	}

	public async findByUserId(user_id: string): Promise<WatchList[]> {
		const movie = await this.ormRepository.find({
			where: { user_id }
		})

		return movie
	}
	public async findByMovieId(movie_id: number): Promise<WatchList | undefined> {
		const movie = await this.ormRepository.findOne({
			where: { movie_id }
		})

		return movie
	}
	public async find(user_id: string, movie_id: number): Promise<WatchList | undefined> {
		const movie = await this.ormRepository.findOne({
			where: {
				user_id,
				movie_id
			}
		})

		return movie
	}
	public async create(data: ICreateWatchListDTO): Promise<WatchList> {
		const movie = this.ormRepository.create(data)

		await this.ormRepository.save(movie)

		return movie
	}

	public async delete(watchList: WatchList): Promise<void> {
		await this.ormRepository.delete(watchList)

		return
	}
}

export default WatchListRepository
