import React, { useCallback, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import { Container, Input } from './styles'

const Header: React.FC = () => {
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleBlur = useCallback(() => {
		setIsFocused(false)
	}, [])

	return (
		<Container>
			<Input isFocused={isFocused}>
				<input
					name="movie"
					placeholder="Search..."
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				<button>
					<FiSearch />
				</button>
			</Input>
		</Container>
	)
}

export default Header
