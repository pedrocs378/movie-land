import React from 'react'
import {
	Redirect,
	Route as ReactDOMRoute,
	RouteProps as ReactDOMRouteProps
} from 'react-router-dom'
import { useAuth } from '../hooks/auth'

interface RouteProps extends ReactDOMRouteProps {
	isPrivate?: boolean
	component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, children, ...rest }) => {
	const { user } = useAuth()

	return (
		<ReactDOMRoute
			{...rest}
			render={({ location }) => {
				return isPrivate === !!user ? (
					<Redirect to={{ pathname: '/', state: { from: location } }} />
				) : (
					<Component />
				)
			}}
		>
			{children}
		</ReactDOMRoute>
	)
}

export default Route
