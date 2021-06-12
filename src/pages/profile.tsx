import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/client'
import Head from 'next/head'

import { Container, AvatarInput } from '../styles/pages/profile'

export default function Profile() {
	const [session] = useSession()

	if (!session) {
		return null
	}

	return (
		<>
			<Head>
				<title>Profile | Movie Land</title>
			</Head>

			<Container>
				<AvatarInput>
					<img src={session.user.image} alt={session.user.name} />
				</AvatarInput>

				<h1>My profile</h1>

				<section>
					<p>
						<strong>Name: </strong>
						{session.user.name}
					</p>

					<p>
						<strong>Email: </strong>
						{session.user.email}
					</p>
				</section>
			</Container>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req })

	if (!session) {
		return {
			props: {},
			redirect: {
				destination: '/signin'
			}
		}
	}

	return {
		props: {}
	}
}