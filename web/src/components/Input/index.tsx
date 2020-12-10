import React, { InputHTMLAttributes, useCallback, useState } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	icon?: React.ComponentType<IconBaseProps>
	isPassword?: boolean
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, isPassword, ...rest }) => {
	const [showPass, setShowPass] = useState(false)
	const [isFocused, setIsFocused] = useState(false)

	const handleInputFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleInputBlur = useCallback(() => {
		setIsFocused(false)
	}, [])

	const handleShowText = useCallback(() => {
		setShowPass(!showPass)
	}, [showPass])

	return (
		<Container isFocused={isFocused} >
			{ Icon && <Icon size={22} />}
			<input
				name={name}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				type={isPassword ? !showPass ? "password" : "text" : ""}
				{...rest}
			/>
			{ isPassword && (
				<button onClick={handleShowText} >
					{!showPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}
				</button>
			)}
		</Container>
	)
}

export default Input
