import { hash } from 'bcryptjs'

import AppError from '../../../shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface Request {
	avatar: string
	name: string
	email: string
	password: string
}

class CreateUserService {
	constructor(
		private usersRepository: IUsersRepository
	) {}

	public async execute({ avatar, name, email, password }: Request): Promise<User> {

		const checkUserExists = await this.usersRepository.findByEmail(email)

		if (checkUserExists) {
			throw new AppError('Email address already used')
		}

		const hashedPassword = await hash(password, 8)

		const user = await this.usersRepository.create({
			name,
			email,
			avatar,
			password: hashedPassword
		})

		return user
	}
}

export default CreateUserService
