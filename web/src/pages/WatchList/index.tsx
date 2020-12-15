import React, { useCallback, useEffect, useState } from 'react'
import { BiSad } from 'react-icons/bi'

import Movie from '../../components/Movie'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'


import { Container, Message, ListMovies } from './styles'

interface MovieProps {
	id: string
	genre: string
	movie_id: number
	poster_path: string
	title: string
	year: string
	vote_average: number
}

const WatchList: React.FC = () => {
	const [watchList, setWatchList] = useState<MovieProps[]>([])

	const { user } = useAuth()

	useEffect(() => {
		api.get('/watchlist').then(response => {
			setWatchList(response.data)
		})
	}, [user])

	const refreshWatchList = useCallback(() => {
		api.get('/watchlist').then(response => {
			setWatchList(response.data)
		})
	}, [])

	return (
		<Container>
			<h1>Saved movies</h1>
			{ !user ? (
				<Message>
					<BiSad />
					<p>You need to sign in to see your watch list</p>
				</Message>
			) : watchList.length === 0 ? (
				<Message>
					<BiSad />
					<p>You don't have movies saved in yout list yet</p>
				</Message>
			) : (
				<ListMovies>
					{watchList.map(movie => {
						return (
							<Movie
								key={movie.id}
								genre={movie.genre}
								movie={{
									id: movie.movie_id,
									poster_path: movie.poster_path,
									title: movie.title,
									vote_average: movie.vote_average,
									year: movie.year
								}}
								onUpdate={refreshWatchList}
							/>
						)
					})}
				</ListMovies>
			) }
		</Container>
	)
}

export default WatchList
