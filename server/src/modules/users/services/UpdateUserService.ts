import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import uploadConfig from '../../../config/upload'
import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider'

interface UserUpdateData {
	name: string
	email: string
}

interface Request {
	user_id: string
	avatarFileName?: string
	userData?: UserUpdateData
}

@injectable()
class UpdateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider
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
				await this.storageProvider.deleteFile(user.avatar)
			}

			const filename = await this.storageProvider.saveFile(avatarFileName)

			user.avatar = filename
		}

		await this.usersRepository.save(user)

		return user
	}
}

export default UpdateUserService
