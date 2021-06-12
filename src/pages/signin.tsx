import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { signIn, getSession } from 'next-auth/client'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Container } from '../styles/pages/signin'

export default function SignIn() {

	return (
		<>
			<Head>
				<title>Sign in | Movie Land</title>
			</Head>

			<Container>
				<h1>Sign in to your account</h1>

				<button
					type="button"
					className="google"
					onClick={() => signIn('google')}
				>
					<FcGoogle />

					Sign in with Google
				</button>

				<button
					type="button"
					className="github"
					onClick={() => signIn('github')}
				>
					<FaGithub />

					Sign in with Github
				</button>
			</Container>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req })

	if (session) {
		return {
			props: {},
			redirect: {
				destination: '/'
			}
		}
	}

	return {
		props: {},
	}
}