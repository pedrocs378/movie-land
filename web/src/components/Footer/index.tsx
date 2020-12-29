import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useShowMenu } from '../../hooks/menu'

import { Container } from './styles'

const Footer: React.FC = () => {
	const { show } = useShowMenu()

	return (
		<Container isShowllableMenu={show} >
			<span>
				© 2020, made with
				<FaHeart /> by
				<a target="_blank" rel="noopener noreferrer" href="http://www.github.com/pedrocs378">pedrocs378</a>
			</span>
		</Container>
	)
}

export default Footer
