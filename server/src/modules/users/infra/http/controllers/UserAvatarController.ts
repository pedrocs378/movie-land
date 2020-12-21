import { classToClass } from "class-transformer";
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

		return response.json(classToClass(user))
	}
}

export default UserAvatarController
