import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import axios from 'axios'

import { getGenre } from '../../utils/genres'
import { useGenres } from '../../hooks/genres'
import Movie from '../../components/Movie'

import {
	API_URL_POPULAR_MOVIES,
	API_URL_TOP_RATED_MOVIES
} from '../../config/movies'

import {
	Container,
	MovieSection,
	ListMovies
} from './styles'

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

export interface MovieResponseProps {
	page: number
	results: MovieProps[]
	total_pages: number
	total_results: number
}

const Home: React.FC = () => {
	const { genres } = useGenres()
	const [showAllPopularMovies, setShowAllPopularMovies] = useState(false)
	const [showAllTopRatedMovies, setShowAllTopRatedMovies] = useState(false)

	const [popularMovies, setPopularMovies] = useState<MovieResponseProps>(() => {
		const storagedPopular = localStorage.getItem('@MovieLand:popularMovies')

		if (storagedPopular) {
			return JSON.parse(storagedPopular)
		}

		return {} as MovieResponseProps
	})
	const [topRated, setTopRated] = useState<MovieResponseProps>(() => {
		const storagedTopRated = localStorage.getItem('@MovieLand:topRated')

		if (storagedTopRated) {
			return JSON.parse(storagedTopRated)
		}

		return {} as MovieResponseProps
	})

	useEffect(() => {

		if (!popularMovies.results) {
			axios.get(`${API_URL_POPULAR_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&page=1`).then(response => {
				const movies = response.data as MovieResponseProps

				setPopularMovies(movies)
				localStorage.setItem('@MovieLand:popularMovies', JSON.stringify(movies))

				setTimeout(() => {
					localStorage.removeItem('@MovieLand:popularMovies')
				}, 43200000)
			})
		}

		if (!topRated.results) {
			axios.get(`${API_URL_TOP_RATED_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&page=1`).then(response => {
				const movies = response.data as MovieResponseProps

				setTopRated(movies)
				localStorage.setItem('@MovieLand:topRated', JSON.stringify(movies))

				setTimeout(() => {
					localStorage.removeItem('@MovieLand:topRated')
				}, 43200000)
			})
		}

	}, [popularMovies.results, topRated.results])

	const handleGetGenre = useCallback(getGenre, [])

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

	const handleShowAllPopularMovies = useCallback(() => {
		setShowAllPopularMovies(!showAllPopularMovies)

		if (!showAllPopularMovies === false) {
			axios.get(`${API_URL_POPULAR_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&page=1`).then(response => {
				const movies = response.data as MovieResponseProps

				setPopularMovies(movies)
			})
		}
	}, [showAllPopularMovies])

	const handleShowAllTopRatedMovies = useCallback(() => {
		setShowAllTopRatedMovies(!showAllTopRatedMovies)

		if (!showAllTopRatedMovies === false) {
			axios.get(`${API_URL_TOP_RATED_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&page=1`).then(response => {
				const movies = response.data as MovieResponseProps

				setTopRated(movies)
			})
		}
	}, [showAllTopRatedMovies])

	const partOfPopularMovies = useMemo(() => {
		if (!popularMovies.results) {
			return []
		}

		return popularMovies.results.filter((_, index) => index < 7)
	}, [popularMovies.results])

	const partOfTopRated = useMemo(() => {
		if (!topRated.results) {
			return []
		}

		return topRated.results.filter((_, index) => index < 7)
	}, [topRated.results])

	if (!popularMovies.results || !topRated.results) {
		return <h1>No results</h1>
	}

	return (
		<Container>
			<MovieSection isHidden={showAllTopRatedMovies ? true : false} >
				<div>
					<h1>Popular Movies</h1>
					<button onClick={handleShowAllPopularMovies}>
						{showAllPopularMovies ? "Hide movies" : "See all" }
					</button>
				</div>
				<ListMovies>
					{(popularMovies && showAllPopularMovies) ? popularMovies.results.map((movie) => {
						return (
							<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0], genres)} />
						)
					}) : partOfPopularMovies.map((movie) => {
						return (
							<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0], genres)} />
						)
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
					<button onClick={handleShowAllTopRatedMovies}>
						{showAllTopRatedMovies ? "Hide movies" : "See all"}
					</button>
				</div>
				<ListMovies>
					{(topRated && showAllTopRatedMovies) ? topRated.results.map((movie) => {
						return (
							<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0], genres)} />
						)
					}) : partOfTopRated.map((movie) => {
						return (
							<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0], genres)} />
						)
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
