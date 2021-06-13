import styled, { css } from 'styled-components'

interface ContainerProps {
	isFocused: boolean
	isFilled: boolean
	isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
	width: 90%;
	border-radius: 6px;
	background: #4d5a6d;
	display: flex;
	align-items: center;
	border: 3px solid transparent;

	${({ isErrored }) => isErrored && css`
		border-color: #c53030;
		color: #c53030;
	`}

	${({ isFocused }) => isFocused ? css`
		color: #ff9000;
		border-color: #ff9000;
	` : css`
		color: #c2c3c5;
	`}

	${({ isFilled }) => isFilled && css`
		color: #ff9000;
	`}

	> svg {
		margin-left: 8px;
	}

	input {
		padding: 10px;
		background: transparent;
		color: white;
		width: 100%;
		font-size: 15px;
	}

	input::placeholder {
		color: #c2c3c5;
	}

	button {
		background: transparent;
		margin-right: 8px;
		display: flex;

		svg {
			color: #c2c3c5;
		}
	}

	& + div {
		margin-top: 8px;
	}
`
