import React, { MouseEvent, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

import { API_URL_IMAGES } from '../../config/movies'
import { useAuth } from '../../hooks/auth'

import notFound from '../../assets/no-poster.png'

import { Container, MovieInfo, ToolTip } from './styles'
import api from '../../services/api'

export interface MovieParams {
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

interface MovieCard {
	id: number
	title: string
	poster_path: string
	vote_average: number
	release_date?: string
	year?: string
}

interface Props {
	movie: MovieCard
	genre: string
}

const Movie: React.FC<Props> = ({ movie, genre, ...rest }) => {

	const { user } = useAuth()

	const handleSaveMovie = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		if (!user) {
			return
		}

		try {
			await api.post('watchlist', {
				id: movie.id,
				genre,
				title: movie.title,
				year: movie.release_date ? new Date(movie.release_date).getFullYear() : movie.year,
				poster_path: movie.poster_path ? movie.poster_path : "",
				vote_average: movie.vote_average
			})

			alert(`${movie.title} was been saved into your watch list`)
		} catch (err) {
			alert(err)
		}

	}, [user])

	return (
		<Container isLogged={!!user} {...rest}>
			<Link to={`/movie/${movie.id}`}>
				<div>
					<img
						src={movie.poster_path ? `${API_URL_IMAGES}${movie.poster_path}` : notFound}
						alt={movie.title}
					/>

					<button type="button" onClick={handleSaveMovie} >
						<BsBookmark />

						<ToolTip>
							<span>Sign in to save this movie in your Watch List</span>
						</ToolTip>
					</button>

					<MovieInfo>
						<h3>
							{movie.title.length > 20 ? `${movie.title.substring(0, 20)}...` : movie.title}
							<span>{movie.vote_average}</span>
						</h3>
						<p>{movie.release_date ? new Date(movie.release_date).getFullYear() : movie.year }, {genre}</p>
					</MovieInfo>
				</div>
			</Link>
		</Container>
	)
}

export default Movie
