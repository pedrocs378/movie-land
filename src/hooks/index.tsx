import React from 'react'

import { GenresProvider } from './genres'
import { MenuProvider } from './menu'
import { AuthProvider } from './auth'

interface GenreProps {
	id: number
	name: string
}

interface AppProviderProps {
	genres: GenreProps[]
}

const AppProvider: React.FC<AppProviderProps> = ({ children, genres }) => {

	return (
		<GenresProvider data={genres}>
			<MenuProvider>
				<AuthProvider>
					{children}
				</AuthProvider>
			</MenuProvider>
		</GenresProvider>
	)
}

export default AppProvider
