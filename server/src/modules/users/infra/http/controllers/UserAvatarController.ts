import { Request, Response } from "express";
import { container } from 'tsyringe'

import UpdateUserService from "../../../services/UpdateUserService";

class UserAvatarController {

	public async update(request: Request, response: Response): Promise<Response> {
		const updateUserAvatar = container.resolve(UpdateUserService)

		const user = await updateUserAvatar.execute({
			user_id: request.user.id,
			avatarFileName: request.file.filename
		})

		const payload = {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar_url: `${process.env.APP_API_URL}/files/${user.avatar}`,
			created_at: user.created_at,
			updated_at: user.updated_at
		}

		return response.json(payload)
	}
}

export default UserAvatarController
