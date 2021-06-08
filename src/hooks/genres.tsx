import React, { createContext, useContext } from 'react'

export interface GenreProps {
	id: number
	name: string
}

interface GenresContextData {
	genres: GenreProps[]
}

interface GenresProviderProps {
	data: GenreProps[]
}

const GenresContext = createContext<GenresContextData>({} as GenresContextData)

const GenresProvider: React.FC<GenresProviderProps> = ({ children, data }) => {

	return (
		<GenresContext.Provider value={{ genres: data }}>
			{children}
		</GenresContext.Provider>
	)
}

function useGenres(): GenresContextData {
	const context = useContext(GenresContext)

	return context
}

export { GenresProvider, useGenres }
