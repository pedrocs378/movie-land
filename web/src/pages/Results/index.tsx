import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination'
import axios from 'axios'

import { API_URL_GENRES, API_URL_SEARCH_MOVIES } from '../../config/movies'
import { MovieResponseProps, GenreProps } from '../../pages/Home'

import { Container, ListMovies } from './styles'
import Movie from '../../components/Movie'

const Results: React.FC = () => {
	const [genres, setGenres] = useState<GenreProps[]>(() => {
		const storagedGenres = localStorage.getItem('@MovieLand:genres')

		if (storagedGenres) {
			return JSON.parse(storagedGenres)
		}

		return []
	})
	const [searchText, setSearchText] = useState("")
	const [movies, setMovies] = useState<MovieResponseProps>()

	const history = useHistory()

	useEffect(() => {
		if (genres.length === 0) {
			axios.get(`${API_URL_GENRES}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
				const responseGenres = response.data

				setGenres(responseGenres.genres)
				localStorage.setItem('@MovieLand:genres', JSON.stringify(responseGenres.genres))
			})
		}
	}, [genres.length])

	useEffect(() => {
		const [, text] = history.location.search.split('=')
		setSearchText(text)

		axios.get(`${API_URL_SEARCH_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&query=${text}`).then(response => {
			const movies = response.data as MovieResponseProps
			setMovies(movies)
		})
	}, [history])

	const handleGetGenre = useCallback((id: number) => {

		const genre = genres.find((value) => value.id === id)

		return genre?.name || "Undefined Genre"

	}, [genres])

	const handleChangePage = useCallback((_, page: number) => {
		axios.get(`${API_URL_SEARCH_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&query=${searchText}`).then(response => {
			const movies = response.data as MovieResponseProps
			console.log(movies)
			setMovies(movies)
		})
	}, [searchText])

	return (
		<Container>
			<h1>Results for "{searchText}"</h1>
			<ListMovies>
				{movies?.results.map(movie => {
					return (
						<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0])} />
					)
				})}
			</ListMovies>
			<Pagination
				variant="outlined"
				shape="rounded"
				count={movies?.total_pages}
				onChange={handleChangePage}
			/>
		</Container>
	)
}

export default Results
