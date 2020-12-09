import React, { MouseEvent, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { BsBookmark } from 'react-icons/bs'

import { API_URL_IMAGES } from '../../config/movies'

import notFound from '../../assets/no-poster.png'

import { Container } from './styles'

export interface MovieParams {
	id: number
	genre_ids: number[]
	title: string
	original_title: string
	overview: string
	backdrop_path: string
	release_date: string
	poster_path: string
	vote_average: number
}

interface Props {
	movie: MovieParams
	genre: string
}

const Movie: React.FC<Props> = ({ movie, genre, ...rest }) => {

	const handleSaveMovie = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}, [])

	return (
		<Container {...rest}>
			<Link to={{ pathname: `/movie/${movie.id}`, state: { genre } }}>
				<div>
					<img
						src={movie.poster_path ? `${API_URL_IMAGES}${movie.poster_path}` : notFound}
						alt={movie.title}
					/>

					<button onClick={handleSaveMovie} >
						<BsBookmark />
					</button>

					<div>
						<div className="blur" />
						<h3>
							{movie.title.length > 20 ? `${movie.title.substring(0, 20)}...` : movie.title}
							<span>{movie.vote_average}</span>
						</h3>
						<p>{new Date(movie.release_date).getFullYear()}, {genre}</p>
					</div>
				</div>
			</Link>
		</Container>
	)
}

export default Movie
