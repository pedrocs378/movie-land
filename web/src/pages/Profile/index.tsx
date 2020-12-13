import React, { ChangeEvent, useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import Input from '../../components/Input'

import { Container, AvatarInput } from './styles'
import getValidationErrors from '../../utils/getValidationErrors'

interface ProfileFormData {
	name: string
	email: string
	old_password: string
	password: string
	password_confirmation: string
}

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null)

	const { user, updateUser } = useAuth()

	const handleChangeAvatar = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const data = new FormData()

			console.log(event.target.files)
			data.append('avatar', event.target.files[0])

			api.patch('/users/avatar', data).then(response => {
				updateUser(response.data)

				alert("Avatar changed!")
			}).catch(() => {
				alert("Don't can be change the avatar")
			})
		}
	}, [updateUser])

	const handleSubmit = useCallback(async (data: ProfileFormData) => {
		try {
			formRef.current?.setErrors({})

			const schema = Yup.object().shape({
				name: Yup.string().required('Name required'),
				email: Yup.string().required('Email required').email('Digit a valid e-mail'),
				old_password: Yup.string(),
				password: Yup.string().when('old_password', {
					is: (val: string) => !!val.length,
					then: Yup.string().required('Field required'),
					otherwise: Yup.string()
				}),
				password_confirmation: Yup.string()
					.when('old_password', {
						is: (val: string) => !!val.length,
						then: Yup.string().required('Field required'),
						otherwise: Yup.string()
					})
					.oneOf([Yup.ref('password'), undefined], 'Incorrect confirmation')
			})

			await schema.validate(data, {
				abortEarly: false
			})

			const {
				name,
				email,
				old_password,
				password,
				password_confirmation
			} = data

			const formData = {
				name,
				email,
				...(old_password ? {
					old_password,
					password,
					password_confirmation
				} : {}
				)
			}

			const response = await api.put('/users/profile', formData)

			updateUser(response.data)

			alert('Your profile informations have been successfully updated')
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				formRef.current?.setErrors(errors)
				alert(errors)

				return
			}

			alert('An error has ocurrend while updating profile, pleate try again')
		}
	}, [updateUser])

	return (
		<Container>
			<Form
				ref={formRef}
				onSubmit={handleSubmit}
				initialData={{
					name: user.name,
					email: user.email
				}}
			>
				<AvatarInput>
					<img src={`${user.avatar_url}`} alt={user.name} />
					<label htmlFor="avatar">
						<FiCamera />

						<input type="file" id="avatar" onChange={handleChangeAvatar} />
					</label>
				</AvatarInput>

				<h1>My profile</h1>

				<Input name="name" icon={FiUser} placeholder="Name" />
				<Input name="email" icon={FiMail} placeholder="E-mail" />
				<Input
					name="old_password"
					icon={FiLock}
					isPassword
					placeholder="Current Password"
				/>
				<Input
					name="password"
					icon={FiLock}
					isPassword
					placeholder="Password"
				/>
				<Input
					name="password_confirmation"
					icon={FiLock}
					isPassword
					placeholder="Confirm Password"
				/>
				<button type="submit">Confirm changes</button>

			</Form>
		</Container>
	)
}

export default Profile
