import React, { useCallback, useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import axios from 'axios'

import Movie from '../../components/Movie'

import {
	API_URL_POPULAR_MOVIES,
	API_URL_TOP_RATED_MOVIES,
	API_URL_GENRES
} from '../../config/movies'

import {
	Container,
	MovieSection,
	ListMovies
} from './styles'

export interface GenreProps {
	id: number
	name: string
}
interface GenreResponseProp {
	genres: GenreProps[]
}
export interface MovieProps {
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
	const [showAllPopularMovies, setShowAllPopularMovies] = useState(false)
	const [showAllTopRatedMovies, setShowAllTopRatedMovies] = useState(false)

	const [popularMovies, setPopularMovies] = useState<MovieResponseProps>(() => {
		const storagedPopularMovies = localStorage.getItem('@MovieLand:popularMovies')

		if (storagedPopularMovies) {
			const movies = JSON.parse(storagedPopularMovies) as MovieResponseProps

			return movies
		} else {
			return {} as MovieResponseProps
		}
	})
	const [topRated, setTopRated] = useState<MovieResponseProps>(() => {
		const storagedTopRated = localStorage.getItem('@MovieLand:topRated')

		if (storagedTopRated) {
			const movies = JSON.parse(storagedTopRated) as MovieResponseProps

			return movies
		} else {
			return {} as MovieResponseProps
		}
	})
	const [genres, setGenres] = useState<GenreProps[]>(() => {
		const storagedGenres = localStorage.getItem('@MovieLand:genres')

		if (storagedGenres) {
			return JSON.parse(storagedGenres)
		}

		return []
	})

	useEffect(() => {

		if (popularMovies.results.length === 0) {
			axios.get(`${API_URL_POPULAR_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
				const movies = response.data as MovieResponseProps

				setPopularMovies(movies)
				localStorage.setItem('@MovieLand:popularMovies', JSON.stringify(movies))
			})
		}

		if (topRated.results.length === 0) {
			axios.get(`${API_URL_TOP_RATED_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
				const movies = response.data as MovieResponseProps

				setTopRated(movies)
				localStorage.setItem('@MovieLand:topRated', JSON.stringify(movies))
			})
		}

		if (genres.length === 0) {
			axios.get(`${API_URL_GENRES}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
				const responseGenres = response.data as GenreResponseProp

				setGenres(responseGenres.genres)
				localStorage.setItem('@MovieLand:genres', JSON.stringify(responseGenres.genres))
			})
		}

	}, [popularMovies.results.length, topRated.results.length, genres.length])

	const handleGetGenre = useCallback((id: number) => {

		const genre = genres.find((value) => value.id === id)

		return genre?.name || "Undefined Genre"

	}, [genres])

	const handleChangePagePopular = useCallback((_, page: number) => {
		axios.get(`${API_URL_POPULAR_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`).then(response => {
			const movies = response.data as MovieResponseProps

			setPopularMovies(movies)
		})
	}, [])

	const handleChangePageTopRated = useCallback((_, page: number) => {
		axios.get(`${API_URL_TOP_RATED_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`).then(response => {
			const movies = response.data as MovieResponseProps

			setTopRated(movies)
		})
	}, [])

	return (
		<Container>
			<MovieSection isHidden={showAllTopRatedMovies ? true : false} >
				<div>
					<h1>Popular Movies</h1>
					<button onClick={() => setShowAllPopularMovies(!showAllPopularMovies)}>
						{showAllPopularMovies ? "Hide movies" : "See all" }
					</button>
				</div>
				<ListMovies>
					{popularMovies.results.map((movie, index) => {
						if (showAllPopularMovies) {
							return (
								<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0])} />
							)
						} else {
							return index < 6 && (
								<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0])} />
							)
						}
					})}
				</ListMovies>
				{showAllPopularMovies && (
					<Pagination
						variant="outlined"
						shape="rounded"
						page={popularMovies.page}
						count={popularMovies.total_pages}
						onChange={handleChangePagePopular}
					/>
				)}
			</MovieSection>
			<MovieSection isHidden={showAllPopularMovies ? true : false} >
				<div>
					<h1>Top Rated</h1>
					<button onClick={() => setShowAllTopRatedMovies(!showAllTopRatedMovies)}>
						{showAllTopRatedMovies ? "Hide movies" : "See all"}
					</button>
				</div>
				<ListMovies>
					{topRated.results.map((movie, index) => {
						if (showAllTopRatedMovies) {
							return (
								<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0])} />
							)
						} else {
							return index < 6 && (
								<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0])} />
							)
						}
					})}
				</ListMovies>
				{showAllTopRatedMovies && (
					<Pagination
						variant="outlined"
						shape="rounded"
						page={topRated.page}
						count={topRated.total_pages}
						onChange={handleChangePageTopRated}
					/>
				)}
			</MovieSection>
		</Container>
	)
}

export default Home
