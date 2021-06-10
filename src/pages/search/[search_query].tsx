import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Pagination from '@material-ui/lab/Pagination'

import { Movie } from '../../components/Movie'

import { getGenre } from '../../utils/getGenre'
import { tmdbApi } from '../../services/tmdb'

import {
	Container,
	ListMovies
} from '../../styles/pages/searchResults'

interface MovieProps {
	id: number
	title: string
	poster_path: string
	vote_count: number
	vote_average: number
	voteAverageFormatted: string
	genre_ids: number[]
	release_date?: string
	genre_name: string
}

interface MovieResponseProps {
	page: number
	results: MovieProps[]
	total_pages: number
	total_results: number
}

interface SearchResultsProps {
	movies: MovieResponseProps
}

export default function SearchResults({ movies }: SearchResultsProps) {

	const router = useRouter()
	const { search_query } = router.query

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
							/>
						)
					})}
				</ListMovies>
				<Pagination
					variant="outlined"
					shape="rounded"
					count={movies.total_pages}
					onChange={() => { }}
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

	const movies = {
		...response.data,
		results: response.data.results
			.map(movie => {
				return {
					...movie,
					genre_name: getGenre(movie.genre_ids[0], genres),
					voteAverageFormatted: movie.vote_average.toFixed(1)
				}
			})
			.sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
	}

	return {
		props: {
			movies
		}
	}
}