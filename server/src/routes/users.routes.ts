import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import CreateUserService from '../services/CreateUserService'
import UpdateUserService from '../services/UpdateUserService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', upload.fields([
	{ name: 'name' },
	{ name: 'email' },
	{ name: 'password' },
	{ name: 'avatar' },
]), async (request, response) => {

	const { name, email, password } = request.body
	const files = request.files as any

	const createUser = new CreateUserService()

	const user = await createUser.execute({
		avatar: files.avatar[0].filename,
		name,
		email,
		password,
	})

	const payload = {
		id: user.id,
		name: user.name,
		email: user.email,
		avatar: user.avatar,
		created_at: user.created_at,
		updated_at: user.updated_at
	}

	return response.json(payload)
})

usersRouter.put('/profile', ensureAuthenticated, async (request, response) => {
	const userData = request.body

	const updateUser = new UpdateUserService()

	const user = await updateUser.execute({
		user_id: request.user.id,
		userData
	})

	const payload = {
		id: user.id,
		name: user.name,
		email: user.email,
		avatar_url: `http://172.18.176.1:3333/files/${user.avatar}`,
		created_at: user.created_at,
		updated_at: user.updated_at
	}

	return response.json(payload)
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

	const updateUserAvatar = new UpdateUserService()

	const user = await updateUserAvatar.execute({
		user_id: request.user.id,
		avatarFileName: request.file.filename
	})

	const payload = {
		id: user.id,
		name: user.name,
		email: user.email,
		avatar_url: `http://172.18.176.1:3333/files/${user.avatar}`,
		created_at: user.created_at,
		updated_at: user.updated_at
	}

	return response.json(payload)
})

export default usersRouter
