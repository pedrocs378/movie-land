import React, { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api'

interface SignInCredentials {
	email: string
	password: string
}

interface User {
	id: string
	name: string
	email: string
	avatar_url: string | undefined
}

interface AuthState {
	token: string
	user: User
}

interface AuthContextData {
	user: User
	signIn(credentials: SignInCredentials): Promise<void>
	signOut(): void
	updateUser(user: User): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
	const [data ,setData] = useState<AuthState>(() => {
		const token = localStorage.getItem('@MovieLand:token')
		const user = localStorage.getItem('@MovieLand:user')

		if (token && user) {
			api.defaults.headers.authorization = `Bearer ${token}`

			return { token, user: JSON.parse(user) }
		}

		return {} as AuthState
	})

	const signIn = useCallback(async ({ email, password }) => {
		const response = await api.post('sessions', {
			email, password
		})

		const { token, user } = response.data

		localStorage.setItem('@MovieLand:token', token)
		localStorage.setItem('@MovieLand:user', JSON.stringify(user))

		api.defaults.headers.authorization = `Bearer ${token}`

		setData({ token, user })
	}, [])

	const signOut = useCallback(() => {
		localStorage.removeItem('@MovieLand:token')
		localStorage.removeItem('@MovieLand:user')

		setData({} as AuthState)
	}, [])

	const updateUser = useCallback((user: User) => {
		localStorage.setItem('@MovieLand:user', JSON.stringify(user))

		setData({
			token: data.token,
			user
		})
	}, [setData, data.token])

	return (
		<AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }} >
			{children}
		</AuthContext.Provider>
	)
}

function useAuth(): AuthContextData {
	const context = useContext(AuthContext)

	return context
}

export { AuthProvider, useAuth }

