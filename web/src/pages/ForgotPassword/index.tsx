import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { HiOutlineMail } from 'react-icons/hi'
import { FiLogIn } from 'react-icons/fi'
import * as Yup from 'yup'

import Input from '../../components/Input'

import { Container } from './styles'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'

interface ForgotPasswordFormData {
	email: string
}

const ForgotPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null)

	const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {

		try {
			const schema = Yup.object().shape({
				email: Yup.string().required('E-mail is required').email('Enter a valid e-mail address')
			})

			await schema.validate(data, {
				abortEarly: false
			})

			await api.post('/password/forgot', {
				email: data.email
			})

			alert('We send an e-mail to confirm the password recovery, please check your inbox')
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				formRef.current?.setErrors(errors)
				alert(err.inner.map(error => `${error.message}\n`))

				return
			}
		}

	}, [])

	return (
		<Container>
			<Form ref={formRef} onSubmit={handleSubmit} >
				<h1>Recover password</h1>
				<Input
					icon={HiOutlineMail}
					name="email"
					placeholder="E-mail"
				/>
				<button type="submit">Send</button>
			</Form>
			<Link to="/login">
				<FiLogIn />
				Back to login
			</Link>
		</Container>
	)
}

export default ForgotPassword
