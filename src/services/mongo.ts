import mongoose from 'mongoose'

export async function getMongoClient() {
	const mongo = await mongoose.createConnection(process.env.NEXT_PUBLIC_MONGO_DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

	return mongo
}