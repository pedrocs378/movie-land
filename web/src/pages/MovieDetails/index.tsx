import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
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
	title: string
	original_title: string
	genres: Genre[]
	overview: string
	release_date: string
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
	const [recommendations, setRecommentaions] = useState<MovieParams[]>([])
	const [cast, setCast] = useState<Cast[]>([])

	const { params } = useRouteMatch<Params>()
	const { location }: HistoryParams = useHistory()

	useEffect(() => {
		axios.get(`${API_URL_MOVIE}/${params.movie_id}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
			setMovie(response.data)
		})

		axios.get(`${API_URL_MOVIE}/${params.movie_id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
			setRecommentaions(response.data.results)
		})

		axios.get(`${API_URL_MOVIE}/${params.movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}`). then(response => {
			console.log(response.data.cast)
			setCast(response.data.cast)
		})
	}, [params.movie_id])

	return (
		<Container>
			<GridDetails>
				<ColumnInfos>
					<img src={`${API_URL_IMAGES}${movie.backdrop_path}`} alt={movie.original_title} />
					<Section>
						<div>
							<h1>{movie.title} <span>{movie.vote_average}</span></h1>
							<p>{new Date(movie.release_date).getFullYear()}, {location.state.genre} Film </p>
						</div>
						<div>
							<h1>Reviews</h1>
							<p>{movie.vote_count} user</p>
						</div>
					</Section>
					<Section>
						<h1>Description</h1>
						<p>{movie.overview}</p>
					</Section>
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
