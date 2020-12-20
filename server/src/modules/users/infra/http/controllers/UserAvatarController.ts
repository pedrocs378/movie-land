import { Request, Response } from "express";

import UpdateUserService from "../../../services/UpdateUserService";
import UsersRepository from "../../typeorm/repositories/UsersRepository";

class UserAvatarController {

	public async update(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository()
		const updateUserAvatar = new UpdateUserService(usersRepository)

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
	}
}

export default UserAvatarController
