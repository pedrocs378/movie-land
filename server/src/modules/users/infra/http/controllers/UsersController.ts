import { Request, Response } from "express";
import { container } from 'tsyringe'

import CreateUserService from "../../../services/CreateUserService";
import UpdateUserService from "../../../services/UpdateUserService";

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body
		const files = request.files as any

		const createUser = container.resolve(CreateUserService)

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
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const userData = request.body

		const updateUser = container.resolve(UpdateUserService)

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
	}
}

export default UsersController
