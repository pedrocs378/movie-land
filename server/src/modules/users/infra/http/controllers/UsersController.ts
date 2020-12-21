import { classToClass } from "class-transformer";
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

		return response.json(classToClass(user))
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const userData = request.body

		const updateUser = container.resolve(UpdateUserService)

		const user = await updateUser.execute({
			user_id: request.user.id,
			userData
		})

		return response.json(classToClass(user))
	}
}

export default UsersController
