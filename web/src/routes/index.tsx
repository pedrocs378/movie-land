import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import MovieDetails from '../pages/MovieDetails'
import Results from '../pages/Results'
import Profile from '../pages/Profile'
import WatchList from '../pages/WatchList'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

import { useAuth } from '../hooks/auth'

const Routes: React.FC = () => {
	const { user } = useAuth()

	return (
		<Switch>
			<Route path="/" exact component={Home} />

			<Route path="/movie" exact>
				<Redirect to="/" />
			</Route>
			<Route path="/movie/:movie_id" component={MovieDetails} />

			<Route path="/search" exact>
				<Redirect to="/" />
			</Route>
			<Route path="/search/:query" component={Results} />

			<Route path="/login" component={Login}>
				{user && <Redirect to="/" />}
			</Route>
			<Route path="/register" component={Register}>
				{user && <Redirect to="/" />}
			</Route>
			<Route path="/forgot-password" component={ForgotPassword}>
				{user && <Redirect to="/" />}
			</Route>
			<Route path="/reset-password" component={ResetPassword}>
				{user && <Redirect to="/" />}
			</Route>

			<Route path="/profile" component={Profile}>
				{!user && <Redirect to="/" />}
			</Route>

			<Route path="/watchlist" component={WatchList} />
		</Switch>
	)
}

export default Routes
