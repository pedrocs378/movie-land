import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Loading from 'react-loading'
import Pagination from '@material-ui/lab/Pagination'

import { Movie } from '../components/Movie'
import { MovieLoading } from '../components/Movie/MovieLoading'

import { getGenre } from '../utils/getGenre'

import { tmdbApi } from '../services/tmdb'

import {
  Container,
  ListMovies,
  MovieSection
} from '../styles/pages/home'

interface GenreProps {
  id: number
  name: string
}

interface MovieProps {
  id: number
  genre_ids: number[]
  genre_name: string
  title: string
  original_title: string
  overview: string
  backdrop_path: string
  release_date: string
  poster_path: string
  vote_average: number
  voteAverageFormatted: string
  vote_count: number
}

interface MovieResponseProps {
  page: number
  results: MovieProps[]
  total_pages: number
  total_results: number
}

interface HomeProps {
  initialPopularMovies: MovieResponseProps
  initialTopRated: MovieResponseProps
  genres: GenreProps[]
}

export default function Home({ initialPopularMovies, initialTopRated, genres }: HomeProps) {
  const [popularMoviesPage, setPopularMoviesPage] = useState(initialPopularMovies.page)
  const [topRatedPage, setTopRatedPage] = useState(initialTopRated.page)

  const [showAllPopularMovies, setShowAllPopularMovies] = useState(false)
  const [showAllTopRatedMovies, setShowAllTopRatedMovies] = useState(false)

  const {
    data: popularMoviesData,
    isLoading: isPopularMoviesLoading,
    isFetching: isPopularMoviesFetching
  } = useQuery(['popularMovies', popularMoviesPage], async () => {
    const response = await tmdbApi.get<MovieResponseProps>(`/movie/popular?page=${popularMoviesPage}`)

    const movies = {
      ...response.data,
      results: response.data.results
        .map(movie => {
          return {
            ...movie,
            release_date: movie.release_date?.trim() ? String(new Date(movie.release_date).getFullYear()) : '????',
            genre_name: getGenre(movie.genre_ids[0], genres),
            voteAverageFormatted: movie.vote_average.toFixed(1)
          }
        })
        .sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
    }

    return movies
  }, {
    staleTime: 60 * 60 * 24
  })

  const {
    data: topRatedData,
    isLoading: isTopRatedLoading,
    isFetching: isTopRatedFetching,
  } = useQuery(['topRated', topRatedPage], async () => {
    const response = await tmdbApi.get<MovieResponseProps>(`/movie/top_rated?page=${topRatedPage}`)

    const movies = {
      ...response.data,
      results: response.data.results
        .map(movie => {
          return {
            ...movie,
            release_date: movie.release_date?.trim() ? String(new Date(movie.release_date).getFullYear()) : '????',
            genre_name: getGenre(movie.genre_ids[0], genres),
            voteAverageFormatted: movie.vote_average.toFixed(1)
          }
        })
        .sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
    }

    return movies
  }, {
    staleTime: 60 * 60 * 24,
  })

  function handleShowAllPopularMovies() {
    if (showAllPopularMovies) {
      setPopularMoviesPage(initialPopularMovies.page)
    }

    setShowAllPopularMovies(!showAllPopularMovies)
  }

  function handleShowAllTopRated() {
    if (showAllTopRatedMovies) {
      setTopRatedPage(initialTopRated.page)
    }

    setShowAllTopRatedMovies(!showAllTopRatedMovies)
  }

  function handleChangePopularMoviesPage(_, page: number) {
    setPopularMoviesPage(page)
  }

  function handleChangeTopRatedPage(_, page: number) {
    setTopRatedPage(page)
  }

  return (
    <>
      <Head>
        <title>Movie Land</title>
      </Head>

      <Container>
        <MovieSection isHidden={showAllTopRatedMovies} >
          <header>
            <h1>Popular Movies</h1>

            {!isPopularMoviesLoading && isPopularMoviesFetching && (
              <Loading type="balls" height={20} width={20} />
            )}

            <button onClick={handleShowAllPopularMovies}>
              {showAllPopularMovies ? "Hide movies" : "See all"}
            </button>
          </header>

          <ListMovies>
            {showAllPopularMovies
              ? isPopularMoviesLoading
                ? (
                  <MovieLoading totalCards={20} />
                ) : (
                  popularMoviesData.results.map(movie => {
                    return (
                      <Movie
                        key={movie.id}
                        movie={movie}
                      />
                    )
                  })
                ) : (
                initialPopularMovies.results.map(movie => {
                  return (
                    <Movie
                      key={movie.id}
                      movie={movie}
                    />
                  )
                })
              )}
          </ListMovies>

          {showAllPopularMovies && (
            <Pagination
              variant="outlined"
              shape="rounded"
              page={popularMoviesPage}
              count={initialPopularMovies.total_pages}
              onChange={handleChangePopularMoviesPage}
            />
          )}
        </MovieSection>
        <MovieSection isHidden={showAllPopularMovies} >
          <header>
            <h1>Top Rated</h1>

            {!isTopRatedLoading && isTopRatedFetching && (
              <Loading type="balls" height={20} width={20} />
            )}

            <button onClick={handleShowAllTopRated}>
              {showAllTopRatedMovies ? "Hide movies" : "See all"}
            </button>
          </header>

          <ListMovies>
            {showAllTopRatedMovies ? isTopRatedLoading ? (
              <MovieLoading totalCards={20} />
            ) : (
              topRatedData.results.map(movie => {
                return (
                  <Movie
                    key={movie.id}
                    movie={movie}
                  />
                )
              })
            ) : (
              initialTopRated.results.map(movie => {
                return (
                  <Movie
                    key={movie.id}
                    movie={movie}
                  />
                )
              })
            )}
          </ListMovies>

          {showAllTopRatedMovies && (
            <Pagination
              variant="outlined"
              shape="rounded"
              page={topRatedPage}
              count={initialTopRated.total_pages}
              onChange={handleChangeTopRatedPage}
            />
          )}
        </MovieSection>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const popularMoviesResponse = await tmdbApi.get<MovieResponseProps>('/movie/popular?page=1')
  const topRatedResponse = await tmdbApi.get<MovieResponseProps>('/movie/top_rated?page=1')
  const genresResponse = await tmdbApi.get('/genre/movie/list')

  const genres = genresResponse.data.genres

  const initialPopularMovies = {
    ...popularMoviesResponse.data,
    results: popularMoviesResponse.data.results
      .map(movie => {
        return {
          ...movie,
          release_date: movie.release_date?.trim() ? new Date(movie.release_date).getFullYear() : '????',
          genre_name: getGenre(movie.genre_ids[0], genres),
          voteAverageFormatted: movie.vote_average.toFixed(1)
        }
      })
      .sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
      .filter((_, index) => index < 7)
  }

  const initialTopRated = {
    ...topRatedResponse.data,
    results: topRatedResponse.data.results
      .map(movie => {
        return {
          ...movie,
          release_date: movie.release_date?.trim() ? new Date(movie.release_date).getFullYear() : '????',
          genre_name: getGenre(movie.genre_ids[0], genres),
          voteAverageFormatted: movie.vote_average.toFixed(1)
        }
      })
      .sort((a, b) => (b.vote_count * b.vote_average) - (a.vote_count * a.vote_average))
      .filter((_, index) => index < 7)
  }

  return {
    props: {
      initialPopularMovies,
      initialTopRated,
      genres,
    },
    revalidate: 60 * 60 * 24 * 7
  }
}
