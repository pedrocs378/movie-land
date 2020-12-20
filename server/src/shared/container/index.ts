import { container } from 'tsyringe'

import '../../modules/users/providers'
import './providers'

import WatchListRepository from '../../modules/watchlist/infra/typeorm/repositories/WatchListRepository'
import IWatchListRepository from '../../modules/watchlist/repositories/IWatchListRepository'

import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '../../modules/users/repositories/IUsersRepository'

container.registerSingleton<IWatchListRepository>(
	'WatchListRepository',
	WatchListRepository
)

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
)
