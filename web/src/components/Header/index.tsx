import React, { ChangeEvent, useCallback, useState, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import axios from 'axios'

import { API_URL_IMAGES, API_URL_SEARCH_MOVIES } from '../../config/movies'

import { Container, Input, ResultsBox } from './styles'

interface MovieProps {
	id: number
	title: string
	poster_path: string
	genre_ids: number[]
}

const Header: React.FC = () => {
	const [isFocused, setIsFocused] = useState(false)
	const [boxOpened, setBoxOpened] = useState(false)
	const [searchText, setSearchText] = useState("")
	const [movies, setMovies] = useState<MovieProps[]>([])

	const history = useHistory()

	const handleFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleBlur = useCallback(() => {
		if (boxOpened) {
			return
		} else {
			setIsFocused(false)
		}
	}, [boxOpened])

	const handleSetOpenedBox = useCallback(() => {
		setBoxOpened(true)
	}, [])

	const handleSetClosenedBox = useCallback(() => {
		setBoxOpened(false)
	}, [])

	const handleSearchOnDigit = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value)
		if (event.target.value.length > 0) {
			axios.get(`${API_URL_SEARCH_MOVIES}?api_key=${process.env.REACT_APP_API_KEY}&query=${event.target.value}`).then(response => {
				setMovies(response.data.results)
			})
		}

		if (event.target.value.length === 0) {
			setMovies([])
		}
	}, [])

	const handleSubmit = useCallback((event: FormEvent) => {
		event.preventDefault()

		history.push(`/search/${searchText}`)

	}, [searchText, history])

	return (
		<Container>
			<form onSubmit={handleSubmit} >
				<Input isFocused={isFocused}>
					<input
						name="movie"
						placeholder="Search..."
						value={searchText}
						onChange={handleSearchOnDigit}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<button type="submit" >
						<FiSearch />
					</button>
				</Input>
				<ResultsBox isFocused={isFocused} onMouseEnter={handleSetOpenedBox} onMouseLeave={handleSetClosenedBox}>
					{movies.map((movie, index) => {
						return index < 8 && (
							<Link
								key={movie.id}
								to={`/movie/${movie.id}`}
								onClick={() => setIsFocused(false)}
							>
								<div>
									{movie.poster_path && <img src={`${API_URL_IMAGES}${movie.poster_path}`} alt={movie.title} />}
									<span>{movie.title}</span>
								</div>
								<FiArrowRight />
							</Link>
						)
					})}
				</ResultsBox>
			</form>
		</Container>
	)
}

export default Header
