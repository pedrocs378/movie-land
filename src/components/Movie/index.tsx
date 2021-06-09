import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

import { API_URL_IMAGES } from '../../config/movies'
import { useAuth } from '../../hooks/auth'

import { api } from '../../services/api'

import { Container, MovieInfo, ToolTip } from './styles'

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
	genre_name: string
}

interface Props {
	movie: MovieCard
	onUpdate?: () => void
}

const Movie: React.FC<Props> = ({ movie, onUpdate, ...rest }) => {
	const [saved, setSaved] = useState(false)

	const { user } = useAuth()

	useEffect(() => {
		if (user) {
			api.get(`watchlist/${movie.id}`).then(response => {
				setSaved(response.data.found)
			})
		}
	}, [movie, user])

	const handleSaveMovie = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		if (!user) {
			return
		}

		try {
			if (!saved) {
				await api.post('watchlist', {
					id: movie.id,
					genre: movie.genre_name,
					title: movie.title,
					year: movie.release_date?.trim() ? new Date(movie.release_date).getFullYear() : '????',
					poster_path: movie.poster_path ? movie.poster_path : "",
					vote_average: movie.vote_average
				})
				setSaved(!saved)

				onUpdate && onUpdate()

			} else {
				await api.delete('watchlist', {
					data: {
						movie_id: movie.id
					}
				})
				setSaved(!saved)

				onUpdate && onUpdate()
			}

		} catch (err) {
			alert(err)
		}

	}, [user, movie, saved, onUpdate])

	return (
		<Container isLogged={!!user} {...rest}>
			<Link href={`/movie/${movie.id}`}>
				<a>
					<img
						src={movie.poster_path ? `${API_URL_IMAGES}${movie.poster_path}` : '/images/no-poster.png'}
						alt={movie.title}
					/>

					<button type="button" onClick={handleSaveMovie} >
						{saved ? <BsBookmarkFill /> : <BsBookmark />}

						<ToolTip>
							<span>Sign in to save this movie in your Watch List</span>
						</ToolTip>
					</button>

					<MovieInfo>
						<div>
							<h3>{movie.title}</h3>

							<strong>{movie.vote_average}</strong>
						</div>
						<p>{movie.release_date?.trim() ? new Date(movie.release_date).getFullYear() : '????'}, {movie.genre_name}</p>
					</MovieInfo>
				</a>
			</Link>
		</Container>
	)
}

export { Movie }
