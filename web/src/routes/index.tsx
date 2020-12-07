import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import MovieDetails from '../pages/MovieDetails'

const Routes: React.FC = () => {

	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/movie/:movie_id" component={MovieDetails} />
		</Switch>
	)
}

export default Routes
