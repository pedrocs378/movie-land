import React from 'react'

import { GenresProvider } from './genres'
import { AuthProvider } from './auth'

const AppProvider: React.FC = ({ children }) => {

	return (
		<GenresProvider>
			<AuthProvider>
				{children}
			</AuthProvider>
		</GenresProvider>
	)
}

export default AppProvider
