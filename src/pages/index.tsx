import { useState, useCallback, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Pagination from '@material-ui/lab/Pagination'
import { setCookie } from 'nookies'

import { Movie } from '../components/Movie'

import { GenreProps, useGenres } from '../hooks/genres'
import { getGenre } from '../utils/genres'

import { tmdbApi } from '../services/tmdb'

import {
  Container,
  ListMovies,
  MovieSection
} from '../styles/pages/home'

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

interface HomeProps {
  popularMovies: MovieResponseProps
  topRated: MovieResponseProps
  genres: GenreProps[]
}

export default function Home({ popularMovies, topRated, genres }: HomeProps) {
  const [showAllPopularMovies, setShowAllPopularMovies] = useState(false)
  const [showAllTopRatedMovies, setShowAllTopRatedMovies] = useState(false)

  const handleGetGenre = useCallback(getGenre, [])

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

  return (
    <>
      <Head>
        <title>Movie Land</title>
      </Head>

      <Container>
        <MovieSection isHidden={showAllTopRatedMovies ? true : false} >
          <div>
            <h1>Popular Movies</h1>
            <button onClick={() => { }}>
              {showAllPopularMovies ? "Hide movies" : "See all"}
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
              onChange={() => { }}
            />
          )}
        </MovieSection>
        <MovieSection isHidden={showAllPopularMovies ? true : false} >
          <div>
            <h1>Top Rated</h1>
            <button onClick={() => { }}>
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
              onChange={() => { }}
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

  const popularMovies = popularMoviesResponse.data
  const topRated = topRatedResponse.data
  const genres = genresResponse.data.genres

  return {
    props: {
      popularMovies,
      topRated,
      genres
    },
    revalidate: 60 * 60 * 24 * 7
  }
}
