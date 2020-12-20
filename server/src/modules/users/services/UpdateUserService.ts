import path from 'path'
import fs from 'fs'

import AppError from '../../../shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import uploadConfig from '../../../config/upload'
import IUsersRepository from '../repositories/IUsersRepository'

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
	constructor(
		private usersRepository: IUsersRepository
	) {}

	public async execute({ user_id, avatarFileName, userData }: Request): Promise<User> {

		const user = await this.usersRepository.findById(user_id)

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


		await this.usersRepository.save(user)

		return user
	}
}

export default UpdateUserService
