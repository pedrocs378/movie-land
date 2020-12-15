import React from 'react'
import { FaHeart } from 'react-icons/fa'

import { Container } from './styles'

const Footer: React.FC = () => {

	return (
		<Container>
			<span>
				© 2020, made with
				<FaHeart /> by
				<a target="_blank" rel="noopener noreferrer" href="http://www.github.com/pedrocs378">pedrocs378</a>
			</span>
		</Container>
	)
}

export default Footer
