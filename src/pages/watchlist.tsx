import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { BiSad } from 'react-icons/bi'
import { RiEmotionNormalLine } from 'react-icons/ri'

import { Movie } from '../components/Movie'
import { MovieLoading } from '../components/Movie/MovieLoading'

import { useWatchlist } from '../contexts/watchlist'

import {
	Container,
	ListMovies,
	Message
} from '../styles/pages/watchlist'

export default function WatchList() {
	const [session] = useSession()
	const { watchList, isFetching, isLoading } = useWatchlist()

	return (
		<>
			<Head>
				<title>Watch List | Movie Land</title>
			</Head>

			<Container>
				<h1>Saved movies</h1>
				{!session ? (
					<Message>
						<BiSad />
						<p>You need sign in to see your watch list</p>
					</Message>
				) : isLoading ? (
					<ListMovies>
						<MovieLoading totalCards={7} />
					</ListMovies>
				) : watchList.length === 0 ? (
					<Message>
						<RiEmotionNormalLine />
						<p>You don't have movies saved in yout list yet</p>
					</Message>
				) : (
					<ListMovies>
						{watchList.map(movie => {
							return (
								<Movie
									key={movie.id}
									movie={movie}
									onUpdate={() => { }}
								/>
							)
						})}

						{(!isLoading && isFetching) && (
							<MovieLoading totalCards={1} />
						)}
					</ListMovies>
				)}
			</Container>
		</>
	)
}