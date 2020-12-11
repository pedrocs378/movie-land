import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import MovieDetails from '../pages/MovieDetails'
import Results from '../pages/Results'
import { useAuth } from '../hooks/auth'

const Routes: React.FC = () => {
	const { user } = useAuth()

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

			<Route path="/login" component={Login} >
				{ user && <Redirect to="/" /> }
			</Route>
			<Route path="/register" component={Register} >
				{user && <Redirect to="/" />}
			</Route>
		</Switch>
	)
}

export default Routes
