import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { API_URL_GENRES } from '../config/movies'

export interface GenreProps {
	id: number
	name: string
}

interface GenresContextData {
	genres: GenreProps[]
}

const GenresContext = createContext<GenresContextData>({} as GenresContextData)

const GenresProvider: React.FC = ({ children }) => {
	const [genres, setGenres] = useState<GenreProps[]>(() => {
		const storagedGenres = localStorage.getItem('@MovieLand:genres')

		if (storagedGenres) {
			return JSON.parse(storagedGenres)
		}

		return []
	})

	useEffect(() => {
		if (genres.length === 0) {
			axios.get(`${API_URL_GENRES}?api_key=${process.env.REACT_APP_API_KEY}`).then(response => {
				const responseGenres = response.data as GenresContextData

				setGenres(responseGenres.genres)
				localStorage.setItem('@MovieLand:genres', JSON.stringify(responseGenres.genres))
			})
		}
	}, [genres])

	return (
		<GenresContext.Provider value={{ genres }}>
			{children}
		</GenresContext.Provider>
	)
}

function useGenres(): GenresContextData {
	const context = useContext(GenresContext)

	if (!context) {
		throw new Error('useGenres must be used within as GenresProvider')
	}

	return context
}

export { GenresProvider, useGenres }
