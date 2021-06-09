import React from 'react'

import { GenresProvider } from './genres'
import { MenuProvider } from './menu'
import { AuthProvider } from './auth'

const AppProvider: React.FC = ({ children }) => {

	return (
		<GenresProvider>
			<MenuProvider>
				<AuthProvider>
					{children}
				</AuthProvider>
			</MenuProvider>
		</GenresProvider>
	)
}

export { AppProvider }
