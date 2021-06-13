import { useSession } from 'next-auth/client';
import { useEffect, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from 'react-toastify';
import { createContext } from 'use-context-selector'

import { api } from "../services/api";

interface WatchListResponseParams {
	_id: string
	movie_id: number
	title: string
	genre_name: string
	poster_path: string
	release_date: string
	vote_average: number
}

interface WatchListData {
	id: number;
	title: string;
	genre_name: string;
	poster_path: string;
	release_date: string;
	vote_average: number;
	voteAverageFormatted: string;
}

interface SaveMovieProps {
	id: number
	title: String
	poster_path: String
	release_date?: String
	genre_name: String
	vote_average: number
}

interface MovieMutationData {
	movie_id: number
	title: String
	poster_path: String
	release_date: String
	genre_name: String
	vote_average: number
}

interface WatchListContextData {
	watchList: WatchListData[]
	isLoading: boolean
	isFetching: boolean
	saveMovie: (movie: SaveMovieProps) => Promise<void>
	deleteMovie: (id: number) => Promise<void>
}

export const WatchlistContext = createContext({} as WatchListContextData)

export const WatchlistProvider: React.FC = ({ children }) => {
	const [session] = useSession()

	const {
		data: watchList,
		isLoading,
		isFetching,
		refetch,
	} = useQuery(['watchlist'], async () => {
		const response = await api.get<WatchListResponseParams[]>('/watchlist')

		const movies = response.data.map(movie => {
			return {
				id: movie.movie_id,
				title: movie.title,
				genre_name: movie.genre_name,
				poster_path: movie.poster_path,
				release_date: movie.release_date?.trim() ? String(new Date(movie.release_date).getFullYear()) : '????',
				vote_average: movie.vote_average,
				voteAverageFormatted: movie.vote_average.toFixed(1)
			}
		})

		return movies
	}, {
		staleTime: 60 * 60 * 24,
		initialData: [],
		onError: () => {
			toast.error('Could not load your WatchList. Please, try reload the page.')
		}
	})

	const queryClient = useQueryClient();

	const saveMovieMutation = useMutation((data: MovieMutationData) => {
		return api.post('/watchlist', data)
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('watchlist')
			refetch()
		}
	});

	const deleteMovieMutation = useMutation((movie_id: number) => {
		return api.delete('/watchlist', {
			data: {
				movie_id
			}
		})
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('watchlist')
			refetch()
		}
	});

	const saveMovie = useCallback(async (movie: SaveMovieProps) => {
		await saveMovieMutation.mutateAsync({
			movie_id: movie.id,
			title: movie.title,
			poster_path: movie.poster_path,
			release_date: movie.release_date,
			genre_name: movie.genre_name,
			vote_average: movie.vote_average
		})
	}, [])

	const deleteMovie = useCallback(async (id: number) => {
		await deleteMovieMutation.mutateAsync(id)
	}, [])

	useEffect(() => {
		if (session) {
			queryClient.invalidateQueries('watchlist')
			refetch()
		}
	}, [session])

	return (
		<WatchlistContext.Provider value={{
			watchList,
			isLoading,
			isFetching,
			saveMovie,
			deleteMovie
		}}>
			{children}
		</WatchlistContext.Provider>
	)
}