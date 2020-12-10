import React, { FormEvent, useCallback } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi'

import Input from '../../components/Input'

import { Container } from './styles'
import { Link } from 'react-router-dom'

const Register: React.FC = () => {

	const handleSubmit = useCallback((event: FormEvent) => {
		event.preventDefault()

	}, [])

	return (
		<Container>
			<form onSubmit={handleSubmit} >
				<h1>Register a new account</h1>
				<Input
					icon={HiOutlineMail}
					name="name"
					placeholder="Name"
				/>
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
				<Input
					icon={BiLockAlt}
					name="confirm-password"
					placeholder="Confirm password"
					isPassword
				/>
				<button type="submit">Register</button>
			</form>
			<Link to="/login">
				Already have an account? Go to login
			</Link>
		</Container>
	)
}

export default Register
