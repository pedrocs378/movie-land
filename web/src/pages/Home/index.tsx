import React, { useCallback, useEffect, useState } from 'react'
import { GiClapperboard, GiPopcorn } from 'react-icons/gi'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineEdit, AiOutlineStar } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import axios from 'axios'

import {
	Container,
	SideMenu,
	TitleContainer,
	ProfileContainer,
	Navigation,
	Content,
	SearchInput,
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
	const [isFocused, setIsFocused] = useState(false)
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

	const handleFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleBlur = useCallback(() => {
		setIsFocused(false)
	}, [])

	const handleGetGenre = useCallback((id: number) => {

		const genre = genres.find((value) => value.id === id)

		return genre?.name || "Undefined Genre"

	}, [genres])

	return (
		<Container>
			<SideMenu>
				<TitleContainer href="/" >
					<GiClapperboard />

					<h1>MOVIE<span>LAND</span></h1>
				</TitleContainer>

				<ProfileContainer href="/" >
					<img src="https://pbs.twimg.com/profile_images/1241471716213342209/cepHHPSo_400x400.jpg" alt="Pedro César" />

					<span>Pedro César</span>

					<AiOutlineEdit />
				</ProfileContainer>

				<Navigation>
					<h4>Media</h4>

					<a href="/">
						<GiPopcorn />
						Movies
					</a>
					<a href="/">
						<AiOutlineStar />
						Rated
					</a>
				</Navigation>

				<Navigation>
					<a href="/">
						<BsBookmark />
						Saved
					</a>
				</Navigation>

				<button>
					Sign Out
				</button>
			</SideMenu>

			<Content>
				<SearchInput isFocused={isFocused} >
					<input
						name="movie"
						placeholder="Search..."
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<button>
						<FiSearch />
					</button>
				</SearchInput>
				<MovieSection>
					<div>
						<h1>Popular Movies</h1>
						<button>See all</button>
					</div>
					<ListMovies>
						{popularMovies.map((movie, index) => {
							return index < 6 && (
								<Movie key={movie.id} href="/">
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
								<Movie key={movie.id} href="/">
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
								</Movie>
							)
						})}
					</ListMovies>
				</MovieSection>
			</Content>
		</Container>
	)
}

export default Home
