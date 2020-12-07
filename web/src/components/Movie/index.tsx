import React from 'react'
import { BsBookmark } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { API_URL_IMAGES } from '../../config/movies'

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

	return (
		<Container {...rest}>
			<Link to={{ pathname: `/movie/${movie.id}`, state: { genre } }}>
				<div>
					<img src={`${API_URL_IMAGES}${movie.poster_path}`} alt={movie.title} />

					<button>
						<BsBookmark />
					</button>

					<div>
						<div className="blur" />
						<h3>
							{movie.title}
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
