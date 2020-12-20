import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider'

import AppError from '../../../shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface Request {
	avatar: string
	name: string
	email: string
	password: string
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) {}

	public async execute({ avatar, name, email, password }: Request): Promise<User> {

		const checkUserExists = await this.usersRepository.findByEmail(email)

		if (checkUserExists) {
			throw new AppError('Email address already used')
		}

		const hashedPassword = await hash(password, 8)
		const filename = await this.storageProvider.saveFile(avatar)

		const user = await this.usersRepository.create({
			name,
			email,
			avatar: filename,
			password: hashedPassword
		})

		return user
	}
}

export default CreateUserService
