import 'reflect-metadata'
import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import AppError from '../../errors/AppError'
import uploadConfig from '../../../config/upload'
import routes from './routes'

import '../typeorm'
import '../../container'

const app = express()
const PORT = process.env.PORT || 3333

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if(err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message
		})
	}

	console.log(err)

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})
})

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
