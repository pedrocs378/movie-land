import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BsBookmark, BsBookmarkFill, BsStopwatch } from 'react-icons/bs'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import Rating from '@material-ui/lab/Rating'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import axios from 'axios'

import Movie, { MovieParams } from '../../components/Movie'
import { useGenres } from '../../hooks/genres'

import { API_URL_IMAGES, API_URL_MOVIE, API_URL_IMAGES_W200 } from '../../config/movies'

import {
	Container,
	GridDetails,
	ColumnInfos,
	ToolTip,
	ColumnCast,
	CastItem,
	Section,
	Recommendations,
	ListMovies
} from './styles'
import { getGenre } from '../../utils/genres'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

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
	poster_path: string
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

interface Params {
	movie_id: string
}

const MovieDetails: React.FC = () => {
	const [movie, setMovie] = useState<MovieDetailsProps>({} as MovieDetailsProps)
	const [date, setDate] = useState("")
	const [recommendations, setRecommentaions] = useState<MovieParams[]>([])
	const [cast, setCast] = useState<Cast[]>([])
	const [saved, setSaved] = useState(false)

	const { genres } = useGenres()
	const { user } = useAuth()

	const { params } = useRouteMatch<Params>()

	useEffect(() => {
		axios.get(`${API_URL_MOVIE}/${params.movie_id}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
			setMovie(response.data)
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

	useEffect(() => {
		if (user) {
			api.get(`watchlist/${params.movie_id}`).then(response => {
				setSaved(response.data.found)
			})
		} else {
			setSaved(false)
		}
	}, [params.movie_id, user])

	const handleGetGenre = useCallback(getGenre, [])

	const handleSaveMovie = useCallback(async () => {

		if (!user) {
			return
		}

		try {
			if (!saved) {
				await api.post('watchlist', {
					id: params.movie_id,
					genre: movie.genres[0].name,
					title: movie.title,
					year: new Date(movie.release_date).getFullYear(),
					poster_path: movie.poster_path ? movie.poster_path : "",
					vote_average: movie.vote_average
				})
				setSaved(!saved)

			} else {
				await api.delete('watchlist', {
					data: {
						movie_id: params.movie_id
					}
				})
				setSaved(!saved)
			}
		} catch(err) {
			alert(err)
		}
	}, [user, saved, movie, params.movie_id])

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

	const rating = useMemo(() => {
		return (5 * movie.vote_average) / 10
	}, [movie])

	return (
		<Container>
			<GridDetails>
				<ColumnInfos movieSaved={saved} isLogged={!!user} >
					<img src={`${API_URL_IMAGES}${movie.backdrop_path}`} alt={movie.original_title} />
					<button type="button" onClick={handleSaveMovie} >
						{ saved ? <BsBookmarkFill /> : <BsBookmark /> }
						{ saved ? "Remove" : "Save" }

						<ToolTip>
							<span>Sign in to save this movie in your Watch List</span>
						</ToolTip>
					</button>
					<div>
						<Section>
							<h1>
								{movie.title} <Rating name="read-only" value={rating} readOnly />
							</h1>
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
							<CastItem key={actor.id} >
								{actor.profile_path && <img src={`${API_URL_IMAGES_W200}${actor.profile_path}`} alt={actor.original_name} />}
								<div>
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
					{recommendations.map((movie, index) => {
						return index < 6 && (
							<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0], genres)} />
						)
					})}
				</ListMovies>
			</Recommendations>
		</Container>
	)
}

export default MovieDetails
