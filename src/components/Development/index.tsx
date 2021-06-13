import { GiClapperboard } from 'react-icons/gi'

import { Container } from './styles'

export function Development() {

	return (
		<Container>
			<div>
				<h1>
					<GiClapperboard />

					MOVIE <span>LAND</span>
				</h1>

				<p>
					Website under maintenance. Please come back soon.
				</p>
			</div>
		</Container>
	)
}
