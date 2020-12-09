import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { BsStopwatch } from 'react-icons/bs'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import axios from 'axios'

import Movie, { MovieParams } from '../../components/Movie'

import { API_URL_IMAGES, API_URL_MOVIE, API_URL_IMAGES_W200 } from '../../config/movies'

import {
	Container,
	GridDetails,
	ColumnInfos,
	ColumnCast,
	Section,
	Recommendations,
	ListMovies
} from './styles'

interface Genre {
	id: number
	name: string
}

interface MovieDetailsProps {
	backdrop_path: string
	budget: number
	title: string
	original_title: string
	genres: Genre[]
	overview: string
	release_date: string
	revenue: number
	runtime: number
	vote_average: number
	vote_count: number
}

interface Cast {
	id: number
	name: string
	original_name: string
	character: string
	profile_path: string
}

interface HistoryParams {
	location: {
		state: {
			genre: string
		}
	}
}

interface Params {
	movie_id: string
}

const MovieDetails: React.FC = () => {
	const [movie, setMovie] = useState<MovieDetailsProps>({} as MovieDetailsProps)
	const [date, setDate] = useState("")
	const [recommendations, setRecommentaions] = useState<MovieParams[]>([])
	const [cast, setCast] = useState<Cast[]>([])

	const { params } = useRouteMatch<Params>()
	const { location }: HistoryParams = useHistory()

	useEffect(() => {
		axios.get(`${API_URL_MOVIE}/${params.movie_id}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
			setMovie(response.data)
			console.log(response.data)
			const releaseDate = new Date(response.data.release_date)

			setDate(format(releaseDate, 'dd/MM/yyyy', {
				locale: ptBR
			}))
		})

		axios.get(`${API_URL_MOVIE}/${params.movie_id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
			setRecommentaions(response.data.results)
		})

		axios.get(`${API_URL_MOVIE}/${params.movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
			setCast(response.data.cast)
		})
	}, [params.movie_id])

	const budget = useMemo(() => {
		if (movie.budget) {
			return movie.budget.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD'
			})
		} else {
			return "Not defined"
		}
	}, [movie])

	const revenue = useMemo(() => {
		if (movie.revenue) {
			return movie.revenue.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD'
			})
		} else {
			return "Not defined"
		}
	}, [movie])

	const runtime = useMemo(() => {
		if (movie.runtime) {
			if (movie.runtime > 59) {
				const hour = Math.floor(movie.runtime / 60)
				const minutes = movie.runtime - (hour * 60)

				return `${hour}h ${minutes}min`
			} else {
				return `${movie.runtime}min`
			}
		} else {
			return "Not defined"
		}
	}, [movie])

	return (
		<Container>
			<GridDetails>
				<ColumnInfos>
					<img src={`${API_URL_IMAGES}${movie.backdrop_path}`} alt={movie.original_title} />
					<div>
						<Section>
							<h1>{movie.title} <span>{movie.vote_average}</span></h1>
							<p>{date}</p>
						</Section>
						<Section>
							<h1>Reviews</h1>
							<p>{movie.vote_count} user</p>
						</Section>
					</div>
					<Section>
						<h1>Genres</h1>
						<ul>
							{movie.genres && movie.genres.map(genre => {
								return (
									<li>{genre.name}</li>
								)
							})}
						</ul>
					</Section>
					<Section>
						<h1>Description</h1>
						<p>{movie.overview}</p>
					</Section>
					<div>
						<Section>
							<div>
								<h1>Running Time</h1>
								<BsStopwatch />
							</div>
							<p>{runtime}</p>
						</Section>
						<Section>
							<div>
								<h1>Budget</h1>
								<GiPayMoney />
							</div>
							<p>{budget}</p>
						</Section>
						<Section>
							<div>
								<h1>Revenue</h1>
								<GiReceiveMoney />
							</div>
							<p>{revenue}</p>
						</Section>
					</div>
				</ColumnInfos>
				<ColumnCast>
					<h1>Cast</h1>
					{cast.map((actor, index) => {

						return index < 10 && (
							<div key={actor.id}>
								{actor.profile_path && <img src={`${API_URL_IMAGES_W200}${actor.profile_path}`} alt={actor.original_name} />}
								<div>
									<h2>{actor.name}</h2>
									<p>{actor.character}</p>
								</div>
							</div>
						)
					})}
				</ColumnCast>
			</GridDetails>
			<Recommendations>
				<h1>Recommendations</h1>
				<ListMovies>
					{recommendations.map((movie, index) => {
						return index < 6 && (
							<Movie key={movie.id} movie={movie} genre={location.state.genre} />
						)
					})}
				</ListMovies>
			</Recommendations>
		</Container>
	)
}

export default MovieDetails
