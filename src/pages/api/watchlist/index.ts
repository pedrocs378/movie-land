import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Schema } from "mongoose";

import { getMongoClient } from "../../../services/mongo";

interface UserParams {
	name: String
	email: String
	image: String
	watchlist: [{
		movie_id: Number
		title: String
		poster_path: String
		release_date: String
		genre_name: String
		vote_average: Number
	}]
}

const userSchema = new Schema<UserParams>({
	name: String,
	email: String,
	image: String,
	watchlist: [{
		movie_id: Number,
		title: String,
		poster_path: String,
		release_date: String,
		genre_name: String,
		vote_average: Number,
	}]
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const mongoClient = await getMongoClient()
	const UserModel = mongoClient.model('User', userSchema)

	if (req.method === 'POST') {
		const {
			movie_id,
			title,
			poster_path,
			release_date,
			genre_name,
			vote_average
		} = req.body

		const session = await getSession({ req })
		const user = await UserModel.findOne({ email: session.user.email })

		user.watchlist.push({
			movie_id,
			title,
			poster_path,
			release_date,
			genre_name,
			vote_average
		})

		const userUpdated = await user.save()

		return res.json(userUpdated)

	} else if (req.method === 'GET') {
		const session = await getSession({ req })
		const user = await UserModel.findOne({ email: session.user.email })


		return res.json(user)
	} else {
		res.status(405).send('Method not allowed')
	}
}