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
	justify-content: flex-end;
`

export const InputContainer = styled.div`
	width: 400px;
	position: relative;
`

export const Input = styled.div<SearchInputProps>`
	width: 100%;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 300;

	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 15px;
	border-radius: 4px;
	border-left: 3px solid #ffc50d;
	background: #4d5a6d;
	transition: box-shadow 0.2s;

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

export const ResultsBox = styled.div<SearchInputProps>`
	${({ isFocused }) => isFocused
		? css`
			visibility: visible;
		`
		: css`
			visibility: hidden;
		`}

	background: ${shade(0.3, '#4d5a6d')};
	width: calc(100% + 6px);
	position: absolute;
	top: -3px;
	left: -3px;
	z-index: 100;

	border-radius: 4px;
	padding: 0 3px;

	box-shadow: 0 0 10px 0 ${shade(0.8, '#343d4e')};

	a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
		border-radius: 5px;
		text-decoration: none;

		div {
			display: flex;
			align-items: center;

			img {
				height: 30px;
				width: 30px;
				border-radius: 50%;
				margin-right: 10px;
			}

			span {
				color: white;
			}

		}

		svg {
			color: white;
			height: 20px;
			width: 20px;
		}

		&:hover {
			background: ${shade(0.5, '#4d5a6d')};
		}

		&:first-child {
			margin-top: 40px;
		}
	}
`
