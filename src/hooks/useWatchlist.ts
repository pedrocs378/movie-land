import { useContextSelector } from "use-context-selector"

import { WatchlistContext } from "../contexts/watchlist"

export function useWatchlist() {
	const watchList = useContextSelector(WatchlistContext, movie => movie.watchList)
	const isLoading = useContextSelector(WatchlistContext, movie => movie.isLoading)
	const isFetching = useContextSelector(WatchlistContext, movie => movie.isFetching)
	const saveMovie = useContextSelector(WatchlistContext, movie => movie.saveMovie)
	const deleteMovie = useContextSelector(WatchlistContext, movie => movie.deleteMovie)

	return {
		watchList,
		isLoading,
		isFetching,
		saveMovie,
		deleteMovie
	}
}