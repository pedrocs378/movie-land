import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Container } from '../styles/pages/signin'

export default function SignIn() {

	return (
		<Container>
			<h1>Sign in to your account</h1>

			<button type="button" className="google">
				<FcGoogle />

				Sign in with Google
			</button>

			<button type="button" className="github">
				<FaGithub />

				Sign in with Github
			</button>
		</Container>
	)
}