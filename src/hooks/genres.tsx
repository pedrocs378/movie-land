import React, { createContext, useContext } from 'react'

export interface GenreProps {
	id: number
	name: string
}

interface GenresContextData {
	genres: GenreProps[]
}

const GenresContext = createContext<GenresContextData>({} as GenresContextData)

const GenresProvider: React.FC = ({ children }) => {

	return (
		<GenresContext.Provider value={{ genres: [] }}>
			{children}
		</GenresContext.Provider>
	)
}

function useGenres(): GenresContextData {
	const context = useContext(GenresContext)

	return context
}

export { GenresProvider, useGenres }
