import React, { useCallback, useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination'
import axios from 'axios'

import { API_URL_SEARCH_MOVIES } from '../../config/movies'
import { MovieResponseProps } from '../../pages/Home'
import { useGenres } from '../../hooks/genres'
import { getGenre } from '../../utils/genres'

import Movie from '../../components/Movie'

import { Container, ListMovies } from './styles'

interface Params {
	query: string
}

const Results: React.FC = () => {
	const { genres } = useGenres()
	const [searchText, setSearchText] = useState("")
	const [movies, setMovies] = useState<MovieResponseProps>()

	const { params } = useRouteMatch<Params>()

	useEffect(() => {
		setSearchText(params.query)

		axios.get(`${API_URL_SEARCH_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&query=${params.query}`).then(response => {
			setMovies(response.data)
		})
	}, [params.query])

	const handleGetGenre = useCallback(getGenre, [])

	const handleChangePage = useCallback((_, page: number) => {
		axios.get(`${API_URL_SEARCH_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&query=${searchText}`).then(response => {
			setMovies(response.data)
		})
	}, [searchText])

	return (
		<Container>
			<h1>Results for "{searchText}"</h1>
			<ListMovies>
				{movies?.results.map(movie => {
					return (
						<Movie key={movie.id} movie={movie} genre={handleGetGenre(movie.genre_ids[0], genres)} />
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
