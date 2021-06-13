import React, { useCallback, useState, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiSearch, FiArrowRight, FiMenu } from 'react-icons/fi'
import Loading from 'react-loading'

import { useShowMenu } from '../../contexts/menu'
import { tmdbApi } from '../../services/tmdb'

import { Container, Input, ResultsBox } from './styles'

interface MovieProps {
	id: number
	title: string
	poster_path: string
	genre_ids: number[]
}

let searchTimeout: NodeJS.Timeout

const Header: React.FC = () => {
	const [isFocused, setIsFocused] = useState(false)
	const [boxOpened, setBoxOpened] = useState(false)
	const [searchText, setSearchText] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [movies, setMovies] = useState<MovieProps[]>([])

	const { show, setShow } = useShowMenu()
	const router = useRouter()

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

	const handleSubmit = useCallback((event: FormEvent) => {
		event.preventDefault()
		clearTimeout(searchTimeout)
		setBoxOpened(false)
		setIsLoading(false)

		router.push(`/search/${searchText}`)
	}, [searchText, router])

	useEffect(() => {
		clearTimeout(searchTimeout)
		setIsLoading(true)

		if (searchText.trim()) {
			searchTimeout = setTimeout(() => {
				tmdbApi
					.get<{ results: MovieProps[] }>(`/search/movie?query=${searchText}`)
					.then(response => {
						const data = response.data.results.filter((_, index) => index < 8)

						setMovies(data)
					})
					.finally(() => setIsLoading(false))
			}, 1000)
		} else {
			setMovies([])
			setIsLoading(false)
		}
	}, [searchText])

	return (
		<Container isShowllableMenu={show} >
			<button type="button" onClick={() => setShow(!show)} >
				<FiMenu />
			</button>
			<form onSubmit={handleSubmit} >
				<Input isFocused={isFocused}>
					<input
						name="movie"
						placeholder="Search..."
						value={searchText}
						autoComplete="off"
						onChange={event => setSearchText(event.target.value)}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					{isLoading ? (
						<Loading type="bubbles" height={20} width={20} />
					) : (
						<button type="submit" >
							<FiSearch />
						</button>
					)}
				</Input>
				<ResultsBox isFocused={isFocused} onMouseEnter={handleSetOpenedBox} onMouseLeave={handleSetClosenedBox}>
					{movies.map(movie => {
						return (
							<Link
								key={movie.id}
								href={`/movie/${movie.id}`}
							>
								<a onClick={() => setIsFocused(false)}>
									<div>
										{movie.poster_path && (
											<img
												src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
												alt={movie.title}
											/>
										)}
										<span>{movie.title}</span>
									</div>

									<FiArrowRight />
								</a>
							</Link>
						)
					})}
				</ResultsBox>
			</form>
		</Container>
	)
}

export { Header }
