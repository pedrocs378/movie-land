import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsBookmark } from 'react-icons/bs'
import axios from 'axios'

import {
	Container,
	MovieSection,
	Movie,
	ListMovies
} from './styles'

interface GenreProps {
	id: number
	name: string
}
interface GenreResponseProp {
	genres: GenreProps[]
}
interface MovieProps {
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

interface MovieResponseProps {
	page: number
	results: MovieProps[]
	total_pages: number
	total_results: number
}

const Home: React.FC = () => {
	const [popularMovies, setPopularMovies] = useState<MovieProps[]>([])
	const [topRated, setTopRated] = useState<MovieProps[]>([])
	const [genres, setGenres] = useState<GenreProps[]>(() => {
		const storagedGenres = localStorage.getItem('@MovieLand:genres')

		if (storagedGenres) {
			return JSON.parse(storagedGenres)
		}

		return []
	})

	useEffect(() => {

		axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b3561ef6903fa8b5ebbddbe3b7dcdcd3').then(response => {
			const movies = response.data as MovieResponseProps

			setPopularMovies(movies.results)
			localStorage.setItem('@MovieLand:popularMovies', JSON.stringify(movies))
		})

		axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b3561ef6903fa8b5ebbddbe3b7dcdcd3').then(response => {
			const movies = response.data as MovieResponseProps

			setTopRated(movies.results)
			localStorage.setItem('@MovieLand:topRated', JSON.stringify(movies))
		})

		axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b3561ef6903fa8b5ebbddbe3b7dcdcd3').then(response => {
			const responseGenres = response.data as GenreResponseProp

			setGenres(responseGenres.genres)
			localStorage.setItem('@MovieLand:genres', JSON.stringify(responseGenres.genres))
		})

	}, [])

	const handleGetGenre = useCallback((id: number) => {

		const genre = genres.find((value) => value.id === id)

		return genre?.name || "Undefined Genre"

	}, [genres])

	return (
		<Container>
			<MovieSection>
				<div>
					<h1>Popular Movies</h1>
					<button>See all</button>
				</div>
				<ListMovies>
					{popularMovies.map((movie, index) => {
						return index < 6 && (
							<Movie key={movie.id}>
								<Link to={`/movie/${movie.id}`}>
									<div>
										<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

										<button>
											<BsBookmark />
										</button>

										<div>
											<div className="blur" />
											<h3>
												{movie.title}
												<span>{movie.vote_average}</span>
											</h3>
											<p>{new Date(movie.release_date).getFullYear()}, {handleGetGenre(movie.genre_ids[0])}</p>
										</div>
									</div>
								</Link>
							</Movie>
						)
					})}
				</ListMovies>
			</MovieSection>
			<MovieSection>
				<div>
					<h1>Top Rated</h1>
					<button>See all</button>
				</div>
				<ListMovies>
					{topRated.map((movie, index) => {
						return index < 6 && (
							<Movie key={movie.id}>
								<Link to={`/movie/${movie.id}`}>
									<div>
										<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

										<button>
											<BsBookmark />
										</button>

										<div>
											<div className="blur" />
											<h3>
												{movie.title}
												<span>{movie.vote_average}</span>
											</h3>
											<p>{new Date(movie.release_date).getFullYear()}, {handleGetGenre(movie.genre_ids[0])}</p>
										</div>
									</div>
								</Link>
							</Movie>
						)
					})}
				</ListMovies>
			</MovieSection>
		</Container>
	)
}

export default Home
