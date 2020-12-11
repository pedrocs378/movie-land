import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
	const { email, password } = request.body

	const authenticateUser = new AuthenticateUserService()

	const { token, user } = await authenticateUser.execute({
		email,
		password
	})

	const payload = {
		id: user.id,
		name: user.name,
		email: user.email,
		avatar_url: user.avatar,
		created_at: user.created_at,
		updated_at: user.updated_at
	}

	return response.json({ user: payload, token })
})

export default sessionsRouter
