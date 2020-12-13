import React, { ChangeEvent, useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HiOutlineMail } from 'react-icons/hi'
import { BiLockAlt, BiUser } from 'react-icons/bi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import userAvatarDefault from '../../assets/avatar-default.gif'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'

import { Container } from './styles'

interface SignUpData {
	name: string
	email: string
	password: string
	confirm_password: string
}

const Register: React.FC = () => {
	const formRef = useRef<FormHandles>(null)

	const history = useHistory()

	const handleSubmit = useCallback(async (data: SignUpData) => {

		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Name required'),
				email: Yup.string().required('E-mail required').email('Enter a valid e-mail address'),
				password: Yup.string().min(6, 'Minimum of 6 digits'),
				confirm_password: Yup.string()
					.oneOf([Yup.ref('password'), undefined], 'Passwords must be equals')
			})

			await schema.validate(data, {
				abortEarly: false
			})

			const res = await fetch(userAvatarDefault)
			const blob = await res.blob()

			const formData = new FormData()
			const defaultImg = new File([blob], 'avatar-default.gif', blob)

			formData.append('avatar', defaultImg)
			formData.append('name', data.name)
			formData.append('email', data.email)
			formData.append('password', data.password)

			await api.post('users', formData)

			history.push('/login')
			alert('Cadastro realizado com succeso')
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				formRef.current?.setErrors(errors)
				console.log(errors)
				alert(errors)

				return
			}

			alert(err)
		}

	}, [history])

	return (
		<Container>
			<Form ref={formRef} onSubmit={handleSubmit} >
				<h1>Register a new account</h1>
				<Input
					icon={BiUser}
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
					name="confirm_password"
					placeholder="Confirm password"
					isPassword
				/>
				<button type="submit">Register</button>
			</Form>
			<Link to="/login">
				Already have an account? Go to login
			</Link>
		</Container>
	)
}

export default Register
