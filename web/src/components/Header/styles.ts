import { shade } from 'polished'
import styled, { css } from 'styled-components'

interface SearchInputProps {
	isFocused: boolean
}

export const Container = styled.header`
	grid-area: header;
	width: 95%;
	max-width: 1500px;
	margin: 0 auto;

	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const Input = styled.div<SearchInputProps>`
	width: 400px;
	align-self: flex-end;

	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 15px;
	border-radius: 4px;
	border-left: 3px solid #ffc50d;
	background: #4d5a6d;
	transition: box-shadow 0.2s;

	${({ isFocused }) => isFocused && css`
		box-shadow: 0 0 10px 0 ${shade(0.8, '#343d4e')};
	`}

	input {
		background: transparent;
		border: 0;
		color: white;
		width: 98%;

		&::placeholder {
			color: #c2c3c5;
		}

	}

	button {
		background: transparent;

		svg {
			height: 17px;
			width: 17px;
			color: #c2c3c5;
		}
	}
`
