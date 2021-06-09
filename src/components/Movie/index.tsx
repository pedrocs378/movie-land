import React, { memo, MouseEvent, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import lodash from 'lodash'

import { useAuth } from '../../hooks/auth'

import { api } from '../../services/api'

import { Container, MovieInfo, ToolTip } from './styles'

interface MovieCard {
	id: number
	title: string
	poster_path: string
	vote_average: number
	voteAverageFormatted: string
	release_date?: string
	genre_name: string
}

interface Props {
	movie: MovieCard
	onUpdate?: () => void
}

const MovieComponent: React.FC<Props> = ({ movie, onUpdate, ...rest }) => {
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
						src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/images/no-poster.png'}
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

							<strong>{movie.voteAverageFormatted}</strong>
						</div>
						<p>{movie.release_date?.trim() ? new Date(movie.release_date).getFullYear() : '????'}, {movie.genre_name}</p>
					</MovieInfo>
				</a>
			</Link>
		</Container>
	)
}

export { MovieComponent }

export const Movie = memo(MovieComponent, (prevProps, nextProps) => {
	return lodash.isEqual(prevProps.movie, nextProps.movie)
})


