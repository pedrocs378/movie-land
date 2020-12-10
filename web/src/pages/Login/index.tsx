import React, { FormEvent, useCallback } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi'

import Input from '../../components/Input'

import { Container } from './styles'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {

	const handleSubmit = useCallback((event: FormEvent) => {
		event.preventDefault()

	}, [])

	return (
		<Container>
			<form onSubmit={handleSubmit} >
				<h1>Sign in to your account</h1>
				<Input
					icon={HiOutlineMail}
					name="email"
					placeholder="E-mail"
				/>
				<Input
					icon={BiLockAlt}
					name="password"
					placeholder="Password"
					isPassword
				/>
				<button type="submit">Login</button>
			</form>
			<Link to="/register">
				Don't have account? Register here
			</Link>
		</Container>
	)
}

export default Login
