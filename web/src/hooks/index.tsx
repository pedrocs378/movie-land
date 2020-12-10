import React from 'react'

import { GenresProvider } from './genres'

const AppProvider: React.FC = ({ children }) => {

	return (
		<GenresProvider>
			{children}
		</GenresProvider>
	)
}

export default AppProvider
