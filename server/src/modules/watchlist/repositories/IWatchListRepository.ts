import ICreateWatchListDTO from "../dtos/ICreateWatchListDTO";
import WatchList from "../infra/typeorm/entities/WatchList";

export default interface IWatchListRepository {
	findByUserId: (user_id: string) => Promise<WatchList[]>
	findByMovieId: (movie_id: number) => Promise<WatchList | undefined>
	find: (user_id: string, movie_id: number) => Promise<WatchList | undefined>
	create: (data: ICreateWatchListDTO) => Promise<WatchList>
	delete: (watchList: WatchList) => Promise<void>
}
