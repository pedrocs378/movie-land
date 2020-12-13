import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import AppError from '../errors/AppError'
import User from '../models/User'
import uploadConfig from '../config/upload'

interface UserUpdateData {
	name: string
	email: string
}

interface Request {
	user_id: string
	avatarFileName?: string
	userData?: UserUpdateData
}

class UpdateUserService {
	public async execute({ user_id, avatarFileName, userData }: Request): Promise<User> {
		const userRepository = getRepository(User)

		const user = await userRepository.findOne(user_id)

		if (!user) {
			throw new AppError('Only authenticated users can be change avatar', 401)
		}

		if (userData) {
			user.email = userData.email
			user.name = userData.name
		}

		if (avatarFileName) {
			if (user.avatar) {
				const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
				const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

				if (userAvatarFileExists) {
					await fs.promises.unlink(userAvatarFilePath)
				}
			}

			user.avatar = avatarFileName
		}


		await userRepository.save(user)

		return user
	}
}

export default UpdateUserService
