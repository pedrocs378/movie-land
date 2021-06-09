import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Pagination from '@material-ui/lab/Pagination'

import { Movie } from '../components/Movie'

import { getGenre } from '../utils/getGenre'

import { tmdbApi } from '../services/tmdb'

import {
  Container,
  ListMovies,
  MovieSection
} from '../styles/pages/home'

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
}

export default function Home({ popularMovies, topRated }: HomeProps) {
  const [popularMoviesData, setPopularMoviesData] = useState<MovieResponseProps>(popularMovies)
  const [topRatedData, setTopRatedData] = useState<MovieResponseProps>(topRated)
  const [showAllPopularMovies, setShowAllPopularMovies] = useState(false)
  const [showAllTopRatedMovies, setShowAllTopRatedMovies] = useState(false)

  function handleShowAllPopularMovies() {
    setShowAllPopularMovies(!showAllPopularMovies)
  }

  function handleShowAllTopRated() {
    setShowAllTopRatedMovies(!showAllTopRatedMovies)
  }

  useEffect(() => {
    if (showAllPopularMovies) {
      tmdbApi
        .get<MovieResponseProps>('/movie/popular?page=1')
        .then(response => {
          setPopularMoviesData(response.data)
        })
    } else {
      setPopularMoviesData(popularMovies)
    }
  }, [showAllPopularMovies])

  useEffect(() => {
    if (showAllTopRatedMovies) {
      tmdbApi
        .get<MovieResponseProps>('/movie/top_rated?page=1')
        .then(response => {
          setTopRatedData(response.data)
        })
    } else {
      setTopRatedData(topRated)
    }
  }, [showAllTopRatedMovies])

  return (
    <>
      <Head>
        <title>Movie Land</title>
      </Head>

      <Container>
        <MovieSection isHidden={showAllTopRatedMovies} >
          <div>
            <h1>Popular Movies</h1>
            <button onClick={handleShowAllPopularMovies}>
              {showAllPopularMovies ? "Hide movies" : "See all"}
            </button>
          </div>

          <ListMovies>
            {popularMoviesData.results.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  movie={movie}
                  genre={movie.genre_name}
                />
              )
            })}
          </ListMovies>

          {showAllPopularMovies && (
            <Pagination
              variant="outlined"
              shape="rounded"
              page={popularMoviesData.page}
              count={popularMoviesData.total_pages}
              onChange={() => { }}
            />
          )}
        </MovieSection>
        <MovieSection isHidden={showAllPopularMovies} >
          <div>
            <h1>Top Rated</h1>
            <button onClick={handleShowAllTopRated}>
              {showAllTopRatedMovies ? "Hide movies" : "See all"}
            </button>
          </div>

          <ListMovies>
            {topRatedData.results.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  movie={movie}
                  genre={movie.genre_name}
                />
              )
            })}
          </ListMovies>

          {showAllTopRatedMovies && (
            <Pagination
              variant="outlined"
              shape="rounded"
              page={topRatedData.page}
              count={topRatedData.total_pages}
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

  const genres = genresResponse.data.genres

  const popularMovies = {
    ...popularMoviesResponse.data,
    results: popularMoviesResponse.data.results
      .map(movie => {
        return {
          ...movie,
          genre_name: getGenre(movie.genre_ids[0], genres)
        }
      })
      .filter((_, index) => index < 7)
  }

  const topRated = {
    ...topRatedResponse.data,
    results: topRatedResponse.data.results
      .map(movie => {
        return {
          ...movie,
          genre_name: getGenre(movie.genre_ids[0], genres)
        }
      })
      .filter((_, index) => index < 7)
  }

  return {
    props: {
      popularMovies,
      topRated,
      genres
    },
    revalidate: 60 * 60 * 24 * 7
  }
}
