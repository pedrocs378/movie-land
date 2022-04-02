import React from 'react'

import { MenuProvider } from './menu'
import { WatchlistProvider } from './watchlist'

const AppProvider: React.FC = ({ children }) => {
	return (
		<WatchlistProvider>
			<MenuProvider>
				{children}
			</MenuProvider>
		</WatchlistProvider>
	)
}

export { AppProvider }
