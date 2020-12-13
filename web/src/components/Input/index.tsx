import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { Container } from './styles'
import { useField } from '@unform/core'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	icon?: React.ComponentType<IconBaseProps>
	isPassword?: boolean
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, isPassword, ...rest }) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const [showPass, setShowPass] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)

	const {
		fieldName,
		defaultValue,
		error,
		registerField
	} = useField(name)

	const handleInputFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleInputBlur = useCallback(() => {
		setIsFocused(false)

		setIsFilled(!!inputRef.current?.value)
	}, [])

	const handleShowText = useCallback(() => {
		setShowPass(!showPass)
	}, [showPass])

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value'
		})
	}, [fieldName, registerField])

	return (
		<Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled} >
			{ Icon && <Icon size={22} />}
			<input
				ref={inputRef}
				name={name}
				defaultValue={defaultValue}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				type={isPassword ? !showPass ? "password" : "text" : ""}
				{...rest}
			/>
			{ isPassword && (
				<button type="button" onClick={handleShowText} >
					{!showPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}
				</button>
			)}
		</Container>
	)
}

export default Input
