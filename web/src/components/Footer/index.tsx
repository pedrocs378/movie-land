import React from 'react'
import { FaHeart } from 'react-icons/fa'

import { Container } from './styles'

const Footer: React.FC = () => {

	return (
		<Container>
			© 2020, made with
			<FaHeart /> by
			<a target="_blank" rel="noreferrer" href="http://www.github.com/pedrocs378">pedrocs378</a>
		</Container>
	)
}

export default Footer
