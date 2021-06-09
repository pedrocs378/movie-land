import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { BsBookmark, BsBookmarkFill, BsStopwatch } from 'react-icons/bs'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import Rating from '@material-ui/lab/Rating'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { getRuntime } from '../../utils/getRuntime'
import { getCurrency } from '../../utils/getCurrency'
import { tmdbApi } from '../../services/tmdb'

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

interface Genre {
	id: number
	name: string
}

interface RecommendationMovie {
	id: number
	title: string
	genre_ids: number[]
	original_title: string
	overview?: string
	backdrop_path?: string
	release_date: string
	poster_path: string
	vote_average: number
}

interface MovieParams {
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
}

export default function MovieDetails({ movie }: MovieDetailsProps) {

	const saved = false
	const user = null

	return (
		<>
			<Head>
				<title>{movie.title} | Movie Land</title>
			</Head>

			<Container>
				<GridDetails>
					<ColumnInfos movieSaved={saved} isLogged={!!user} >
						<img
							src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
							alt={movie.original_title}
						/>
						<button type="button" onClick={() => { }} >
							{saved ? <BsBookmarkFill /> : <BsBookmark />}
							{saved ? "Remove" : "Save"}

							<ToolTip>
								<span>Sign in to save this movie in your Watch List</span>
							</ToolTip>
						</button>
						<div>
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
						<div>
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
				</GridDetails>
			</Container>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params

	const movieResponse = await tmdbApi.get<MovieParams>(`/movie/${id}`)
	const recommendationsResponse = await tmdbApi.get<RecommendationMovie[]>(`/movie/${id}/recommendations`)
	const castResponse = await tmdbApi.get<Cast[]>(`/movie/${id}/credits`)

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
		release_date: format(new Date(movieResponse.data.release_date), 'dd/MM/yyyy', {
			locale: ptBR
		}),
		rating: (5 * movieResponse.data.vote_average) / 10,
		budgetFormatted,
		revenueFormatted,
		runtimeFormatted
	}

	return {
		props: {
			movie
		}
	}
}