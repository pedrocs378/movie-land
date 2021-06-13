import React, { memo, MouseEvent, useCallback, useMemo } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Image from 'next/image'
import lodash from 'lodash'

import { useWatchlist } from '../../contexts/watchlist'

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

interface MovieComponentProps {
	movie: MovieCard
	onUpdate?: () => void
}

const MovieComponent: React.FC<MovieComponentProps> = ({ movie, onUpdate, ...rest }) => {
	const [session] = useSession()
	const { watchList, isLoading, saveMovie, deleteMovie } = useWatchlist()

	const isSaved = useMemo(() => {
		if (session && !isLoading) {
			return watchList.some(watchlistMovie => watchlistMovie.id === movie.id)
		} else {
			return false
		}
	}, [session, watchList, isLoading, movie])

	const handleSaveOrRemoveMovie = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		if (!session) {
			return
		}

		try {
			if (isSaved) {
				await deleteMovie(movie.id)

				onUpdate && onUpdate()
			} else {
				await saveMovie(movie)

				onUpdate && onUpdate()
			}
		} catch (err) {
			toast.error(`Oh! An error has ocurred.\n${err}`)
		}

	}, [session, isSaved, movie, onUpdate])

	return (
		<Container isLogged={!!session} {...rest}>
			<Link href={`/movie/${movie.id}`}>
				<a>
					<Image
						src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/images/no-poster.png'}
						alt={movie.title}
						height={900}
						width={600}
						objectFit="cover"
					/>

					<button type="button" onClick={handleSaveOrRemoveMovie} >
						{isSaved ? <BsBookmarkFill /> : <BsBookmark />}

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

export const Movie = memo(MovieComponent, (prevProps, nextProps) => {
	return lodash.isEqual(prevProps.movie, nextProps.movie)
})


