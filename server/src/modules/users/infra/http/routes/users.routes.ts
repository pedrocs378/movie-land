import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../../../../../config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router()
const upload = multer(uploadConfig.multer)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post('/', upload.fields([
	{ name: 'name' },
	{ name: 'email' },
	{ name: 'password' },
	{ name: 'avatar' },
]), usersController.create)

usersRouter.put('/profile', ensureAuthenticated, usersController.update)
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter
