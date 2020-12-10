import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home'
import MovieDetails from '../pages/MovieDetails'
import Results from '../pages/Results'

const Routes: React.FC = () => {

	return (
		<Switch>
			<Route path="/" exact component={Home} />

			<Route path="/movie" exact component={MovieDetails}>
				<Redirect to="/" />
			</Route>
			<Route path="/movie/:movie_id" component={MovieDetails} />

			<Route path="/search" exact>
				<Redirect to="/" />
			</Route>
			<Route path="/search/:query" component={Results} />
		</Switch>
	)
}

export default Routes
