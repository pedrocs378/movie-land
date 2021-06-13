import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import Pagination from '@material-ui/lab/Pagination'

import { Movie } from '../../components/Movie'

import { getGenre } from '../../utils/getGenre'
import { tmdbApi } from '../../services/tmdb'

import {
	Container,
	ListMovies
} from '../../styles/pages/searchResults'
import { useWatchlist } from '../../hooks/useWatchlist'

interface MovieProps {
	id: number
	title: string
	poster_path: string
	vote_count: number
	vote_average: number
	voteAverageFormatted: string
	genre_ids: number[]
	release_date: string
	genre_name: string
}

interface MovieResponseProps {
	page: number
	results: MovieProps[]
	total_pages: number
}

interface SearchResultsProps {
	initialMovies: MovieResponseProps
	genres: {
		id: number
		name: string
	}[]
}

export default function SearchResults({ initialMovies, genres }: SearchResultsProps) {
	const [session] = useSession()
	const { watchList } = useWatchlist()

	const [movies, setMovies] = useState<MovieResponseProps>(initialMovies)
	const [page, setPage] = useState(1)

	const router = useRouter()
	const { search_query } = router.query

	useEffect(() => {
		tmdbApi
			.get<MovieResponseProps>('/search/movie', {
				params: {
					query: search_query,
					page
				}
			})
			.then(response => {
				const data = {
					...response.data,
					results: response.data.results
						.map(movie => {
							return {
								...movie,
								release_date: movie.release_date?.trim() ? new Date(movie.release_date).getFullYear().toString() : '????',
								genre_name: getGenre(movie.genre_ids[0], genres),
								voteAverageFormatted: movie.vote_average.toFixed(1)
							}
						})
						.sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
				}

				setMovies(data)
			})
	}, [page, search_query, genres])

	return (
		<>
			<Head>
				<title>"{search_query}" | Movie Land</title>
			</Head>

			<Container>
				<h1>Results for "{search_query}"</h1>
				<ListMovies>
					{movies.results.map(movie => {
						return (
							<Movie
								key={movie.id}
								movie={movie}
								isSaved={session && watchList.some(watchlistMovie => watchlistMovie.id === movie.id)}
							/>
						)
					})}
				</ListMovies>
				<Pagination
					variant="outlined"
					shape="rounded"
					count={initialMovies.total_pages}
					page={page}
					onChange={(_, page) => setPage(page)}
				/>
			</Container>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { search_query } = params

	const genresResponse = await tmdbApi.get('/genre/movie/list')
	const genres = genresResponse.data.genres

	const response = await tmdbApi.get<MovieResponseProps>('/search/movie', {
		params: {
			query: search_query
		}
	})

	const initialMovies = {
		...response.data,
		results: response.data.results
			.map(movie => {
				return {
					...movie,
					release_date: movie.release_date?.trim() ? new Date(movie.release_date).getFullYear() : '????',
					genre_name: getGenre(movie.genre_ids[0], genres),
					voteAverageFormatted: movie.vote_average.toFixed(1)
				}
			})
			.sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
	}

	return {
		props: {
			initialMovies,
			genres
		}
	}
}