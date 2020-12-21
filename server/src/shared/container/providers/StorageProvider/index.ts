import { container } from 'tsyringe'
import uploadconfig from '../../../../config/upload'

import IStorageProvider from './models/IStorageProvider'

import DiskStorageProvider from './implementations/DiskStorageProvider'
import S3StorageProvider from './implementations/S3StorageProvider'

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	uploadconfig.driver === 'disk' ? DiskStorageProvider : S3StorageProvider
)
