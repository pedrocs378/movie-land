import React, { useCallback, useMemo, useRef } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { BiLockAlt } from 'react-icons/bi'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'
import Input from '../../components/Input'

import { Container } from './styles'

interface ResetPasswordFormData {
	password: string
	password_confirmation: string
}

const ResetPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null)

	const location = useLocation()
	const history = useHistory()

	const token = useMemo(() => {
		const payload = location.search.replace('?token=', '')

		if (!payload.trim()) {
			history.push('/')

			return
		}

		return payload
	}, [history, location.search])

	const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
		formRef.current?.setErrors({})

		try {
			const schema = Yup.object().shape({
				password: Yup.string().required('Password is required'),
				password_confirmation: Yup.string().oneOf(
					[Yup.ref('password'), null],
					'Incorrect confirmation'
				)
			})

			await schema.validate(data, {
				abortEarly: false
			})

			const { password } = data

			if (!token) {
				throw new Error()
			}

			await api.post('/password/reset', {
				password,
				token
			})

			history.push('/')
		} catch(err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err);

				formRef.current?.setErrors(errors);
				alert(err.inner.map(error => `${error.message}\n`))

				return;
			}

			alert(err)
		}

	}, [history, token])

	return (
		<Container>
			<Form ref={formRef} onSubmit={handleSubmit} >
				<h1>Reset your password</h1>
				<Input
					icon={BiLockAlt}
					name="password"
					placeholder="Password"
					isPassword
				/>
				<Input
					icon={BiLockAlt}
					name="password_confirmation"
					placeholder="Confirm password"
					isPassword
				/>
				<button type="submit">Update password</button>
			</Form>
			<Link to="/login">
				<FiLogIn />
				Back to login
			</Link>
		</Container>
	)
}

export default ResetPassword
