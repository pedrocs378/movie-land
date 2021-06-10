import { BiSad } from 'react-icons/bi'
import { RiEmotionNormalLine } from 'react-icons/ri'

import { Movie } from '../components/Movie'
import { MovieLoading } from '../components/Movie/MovieLoading'

import {
	Container,
	ListMovies,
	Message
} from '../styles/pages/watchlist'

export default function WatchList({ watchList = [] }) {

	const user = {}
	const isLoading = false

	return (
		<Container>
			<h1>Saved movies</h1>
			{!user ? (
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
				</ListMovies>
			)}
		</Container>
	)
}