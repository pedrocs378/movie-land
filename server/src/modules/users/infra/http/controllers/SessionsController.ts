import { Request, Response } from "express";

import AuthenticateUserService from "../../../services/AuthenticateUserService";
import UsersRepository from "../../typeorm/repositories/UsersRepository";

class SessionsController {

	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body

		const usersRepository = new UsersRepository()
		const authenticateUser = new AuthenticateUserService(usersRepository)

		const { token, user } = await authenticateUser.execute({
			email,
			password
		})

		const payload = {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar_url: user.avatar ? `http://172.18.176.1:3333/files/${user.avatar}` : undefined,
			created_at: user.created_at,
			updated_at: user.updated_at
		}

		return response.json({ user: payload, token })
	}
}

export default SessionsController
