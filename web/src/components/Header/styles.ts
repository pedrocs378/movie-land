import { shade } from 'polished'
import styled, { css } from 'styled-components'

interface SearchInputProps {
	isFocused: boolean
}

interface ContainerProps {
	isShowllableMenu: boolean
}

export const Container = styled.header<ContainerProps>`
	grid-area: header;

	width: 95%;
	height: 120px;
	max-width: 1500px;
	margin: 0 auto;

	display: flex;
	flex-direction: column;
	justify-content: center;

	> button {
		background: transparent;
		width: 22px;
		height: 22px;
		margin-bottom: 10px;

		svg {
			color: white;
			width: 100%;
			height: 100%;
		}
	}

	form {
		width: 100%;
		position: relative;
	}

	@media(min-width: 670px) {

		form {
			width: 400px;
			align-self: flex-end;
		}

		> button {
			display: none;
		}
	}
`

export const Input = styled.div<SearchInputProps>`
	width: 100%;
	position: absolute;
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
