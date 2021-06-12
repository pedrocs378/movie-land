import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
		}),
		Providers.Google({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async signIn(user, account, profile) {
			const { name, email, image } = user

			console.log(user, profile)

			return true
		}
	},
	database: process.env.NEXT_PUBLIC_MONGO_DATABASE_URL
})