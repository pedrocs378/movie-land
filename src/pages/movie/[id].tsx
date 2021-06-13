import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { BsBookmark, BsBookmarkFill, BsStopwatch } from 'react-icons/bs'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import Loading from 'react-loading'
import { useSession } from 'next-auth/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Rating from '@material-ui/lab/Rating'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Movie } from '../../components/Movie'

import { useWatchlist } from '../../hooks/useWatchlist'
import { tmdbApi } from '../../services/tmdb'

import { getGenre } from '../../utils/getGenre'
import { getRuntime } from '../../utils/getRuntime'
import { getCurrency } from '../../utils/getCurrency'

import {
	Container,
	GridDetails,
	ColumnInfos,
	CastItem,
	ColumnCast,
	ListMovies,
	ToolTip,
	Section,
	Recommendations,
} from '../../styles/pages/movie'

interface PathMovieResponse {
	results: {
		id: number
		vote_count: number
		vote_average: number
	}[]
}

interface Genre {
	id: number
	name: string
}

interface RecommendationMovie {
	id: number
	title: string
	genre_ids: number[]
	original_title: string
	poster_path: string
	vote_average: number
	voteAverageFormatted: string
	vote_count: number
	release_date: string
	genre_name: string
}

interface MovieParams {
	id: number
	backdrop_path: string
	budget: number
	title: string
	original_title: string
	genres: Genre[]
	overview: string
	poster_path: string
	release_date: string
	revenue: number
	runtime: number
	vote_average: number
	vote_count: number
	rating: number
	budgetFormatted: string
	revenueFormatted: string
	runtimeFormatted: string
}

interface Cast {
	id: number
	name: string
	original_name: string
	character: string
	profile_path: string
}

interface MovieDetailsProps {
	movie: MovieParams
	recommendations: RecommendationMovie[]
	cast: Cast[]
}

export default function MovieDetails({ movie, recommendations, cast }: MovieDetailsProps) {
	const [isUpdating, setIsUpdating] = useState(false)
	const [session, sessionLoading] = useSession()

	const { watchList, isLoading, saveMovie, deleteMovie } = useWatchlist()

	const isSaved = useMemo(() => {
		if (session) {
			return watchList.some(watchlistMovie => watchlistMovie.id === movie.id)
		} else {
			return false
		}
	}, [session, watchList, movie])

	async function handleSaveOrRemoveMovie() {
		if (!session) {
			return
		}

		try {
			setIsUpdating(true)

			if (isSaved) {
				await deleteMovie(movie.id)

				toast.success(`${movie.title} removed!`)
			} else {
				await saveMovie({
					id: movie.id,
					genre_name: movie.genres[0].name,
					poster_path: movie.poster_path,
					title: movie.title,
					vote_average: movie.vote_average,
					release_date: movie.release_date
				})

				toast.success(`${movie.title} saved!`)
			}
		} catch (err) {
			toast.error(`Oh! An error has ocurred.\n${err}`)
		} finally {
			setIsUpdating(false)
		}
	}

	return (
		<>
			<Head>
				<title>{movie.title} | Movie Land</title>
			</Head>

			<Container>
				<GridDetails>
					<ColumnInfos movieSaved={isSaved} isLogged={!!session}>
						<img
							className="movie-cover"
							src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
							alt={movie.original_title}
						/>
						<button
							type="button"
							onClick={handleSaveOrRemoveMovie}
							disabled={isUpdating || isLoading || sessionLoading}
						>
							{(isUpdating || isLoading || sessionLoading) ? (
								<Loading
									type="bubbles"
									height={20}
									width={20}
									color="#312e38"
								/>
							) : isSaved ? (
								<>
									<BsBookmarkFill />
									Remove
								</>
							) : (
								<>
									<BsBookmark />
									Save
								</>
							)}

							{!session && (
								<ToolTip>
									<span>Sign in to save this movie in your Watch List</span>
								</ToolTip>
							)}
						</button>
						<div className="row">
							<Section>
								<h1>
									{movie.title} <Rating name="read-only" value={movie.rating} readOnly />
								</h1>
								<p>{movie.release_date}</p>
							</Section>
							<Section>
								<h1>Reviews</h1>
								<p>{movie.vote_count} user</p>
							</Section>
						</div>
						<Section>
							<h1>Genres</h1>
							<ul>
								{(movie.genres && movie.genres.length > 0)
									? movie.genres.map(genre => {
										return (
											<li key={genre.id}>{genre.name}</li>
										)
									})
									: <p>No genres</p>}
							</ul>
						</Section>
						<Section>
							<h1>Description</h1>
							<p>{movie.overview}</p>
						</Section>
						<div className="row">
							<Section>
								<div>
									<h1>Duration</h1>
									<BsStopwatch />
								</div>
								<p>{movie.runtimeFormatted}</p>
							</Section>
							<Section>
								<div>
									<h1>Budget</h1>
									<GiPayMoney />
								</div>
								<p>{movie.budgetFormatted}</p>
							</Section>
							<Section>
								<div>
									<h1>Revenue</h1>
									<GiReceiveMoney />
								</div>
								<p>{movie.revenueFormatted}</p>
							</Section>
						</div>
					</ColumnInfos>
					<ColumnCast>
						<h1>Cast</h1>
						{cast.map(actor => {
							return (
								<CastItem key={actor.id} >
									{actor.profile_path && (
										<Image
											src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
											alt={actor.original_name}
											height={150}
											width={150}
											objectFit="cover"
										/>
									)}
									<div className="info">
										<h2>{actor.name}</h2>
										<p>{actor.character}</p>
									</div>
								</CastItem>
							)
						})}
					</ColumnCast>
				</GridDetails>
				<Recommendations>
					<h1>Recommendations</h1>
					<ListMovies>
						{recommendations.map((recommendationMovie) => {
							return (
								<Movie
									key={recommendationMovie.id}
									movie={recommendationMovie}
									isSaved={session && watchList.some(watchlistMovie => watchlistMovie.id === recommendationMovie.id)}
								/>
							)
						})}
					</ListMovies>
				</Recommendations>
			</Container>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const popularMoviesResponse = await tmdbApi.get<PathMovieResponse>('/movie/popular?page=1')
	const topRatedResponse = await tmdbApi.get<PathMovieResponse>('/movie/top_rated?page=1')

	const popularMovies = popularMoviesResponse.data.results
		.sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
		.filter((_, index) => index < 7)

	const topRated = topRatedResponse.data.results
		.sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
		.filter((_, index) => index < 7)

	const movies = popularMovies.concat(topRated)

	const paths = movies.map(movie => {
		return {
			params: { id: String(movie.id) }
		}
	})

	return {
		paths,
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params

	const genresResponse = await tmdbApi.get('/genre/movie/list')
	const genres = genresResponse.data.genres

	const movieResponse = await tmdbApi.get<MovieParams>(`/movie/${id}`)
	const recommendationsResponse = await tmdbApi.get<{ results: RecommendationMovie[] }>(`/movie/${id}/recommendations`)
	const castResponse = await tmdbApi.get<{ cast: Cast[] }>(`/movie/${id}/credits`)

	const budgetFormatted = movieResponse.data.budget
		? getCurrency(movieResponse.data.budget)
		: 'Not defined'

	const revenueFormatted = movieResponse.data.revenue
		? getCurrency(movieResponse.data.revenue)
		: 'Not defined'

	const runtimeFormatted = movieResponse.data.runtime
		? getRuntime(movieResponse.data.runtime)
		: 'Not defined'

	const movie = {
		...movieResponse.data,
		release_date: movieResponse.data.release_date
			? format(new Date(movieResponse.data.release_date), 'dd/MM/yyyy', {
				locale: ptBR
			})
			: 'Undefined date',
		rating: (5 * movieResponse.data.vote_average) / 10,
		budgetFormatted,
		revenueFormatted,
		runtimeFormatted
	}

	const recommendations = recommendationsResponse.data.results
		.map(movie => {
			return {
				...movie,
				release_date: movie.release_date?.trim() ? new Date(movie.release_date).getFullYear() : '????',
				genre_name: getGenre(movie.genre_ids[0], genres),
				voteAverageFormatted: movie.vote_average.toFixed(1)
			}
		})
		.filter((_, index) => index < 12)
		.sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))

	const cast = castResponse.data.cast.filter((_, index) => index < 10)

	return {
		props: {
			movie,
			recommendations,
			cast
		}
	}
}