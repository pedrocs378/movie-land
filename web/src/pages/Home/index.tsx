import React, { useCallback, useEffect, useState } from 'react'
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
	const [popularMovies, setPopularMovies] = useState<MovieProps[]>(() => {
		const storagedPopularMovies = localStorage.getItem('@MovieLand:popularMovies')

		if (storagedPopularMovies) {
			return JSON.parse(storagedPopularMovies)
		} else {
			return []
		}
	})
	const [topRated, setTopRated] = useState<MovieProps[]>(() => {
		const storagedTopRated = localStorage.getItem('@MovieLand:topRated')

		if (storagedTopRated) {
			return JSON.parse(storagedTopRated)
		} else {
			return []
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

		if (popularMovies.length === 0) {
			axios.get(`${API_URL_POPULAR_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
				const movies = response.data as MovieResponseProps

				setPopularMovies(movies.results)
				localStorage.setItem('@MovieLand:popularMovies', JSON.stringify(movies.results))
			})
		}

		if (topRated.length === 0) {
			axios.get(`${API_URL_TOP_RATED_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
				const movies = response.data as MovieResponseProps

				setTopRated(movies.results)
				localStorage.setItem('@MovieLand:topRated', JSON.stringify(movies.results))
			})
		}

		if (genres.length === 0) {
			axios.get(`${API_URL_GENRES}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
				const responseGenres = response.data as GenreResponseProp

				setGenres(responseGenres.genres)
				localStorage.setItem('@MovieLand:genres', JSON.stringify(responseGenres.genres))
			})
		}

	}, [popularMovies.length, topRated.length, genres.length])

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
							<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0])} />
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
							<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0])} />
						)
					})}
				</ListMovies>
			</MovieSection>
		</Container>
	)
}

export default Home
