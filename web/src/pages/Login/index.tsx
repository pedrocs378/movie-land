import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HiOutlineMail } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'

import Input from '../../components/Input'

import { Container } from './styles'
import getValidationErrors from '../../utils/getValidationErrors'

interface SignInFormData {
	email: string
	password: string
}

const Login: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const { signIn } = useAuth()

	const history = useHistory()

	const handleSubmit = useCallback(async (data: SignInFormData) => {

		try {
			const schema = Yup.object().shape({
				email: Yup.string().required('E-mail required').email('Enter a valid e-mail address'),
				password: Yup.string().required('Password required')
			})

			await schema.validate(data, {
				abortEarly: false
			})

			await signIn({
				email: data.email,
				password: data.password
			})

			history.push('/')
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				formRef.current?.setErrors(errors)

				return
			}

			console.log(err)
		}
	}, [history, signIn])

	return (
		<Container>
			<Form ref={formRef} onSubmit={handleSubmit} >
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
			</Form>
			<Link to="/register">
				Don't have account? Register here
			</Link>
		</Container>
	)
}

export default Login
