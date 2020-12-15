import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
	grid-area: content;

	display: flex;
	flex-direction: column;
	align-items: center;

	width: 95%;
	max-width: 1500px;
	margin: 0 auto;

	form {
		width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		h1 {
			color: white;
			font-size: 25px;
			margin-bottom: 24px;
		}

		> button {
			margin-top: 8px;
			height: 40px;
			width: 90%;
			border-radius: 6px;
			background: #ff9000;
			color: #312e38;
			font-size: 15px;
			font-weight: bold;

			transition: background-color 0.2s;
		}

		> button:hover {
			background: ${shade(0.1, '#ff9000')}
		}
	}

`

export const AvatarInput = styled.div`
	margin-bottom: 32px;
	position: relative;
	max-width: 186px;

	img {
		width: 186px;
		height: 186px;
		border-radius: 50%;
	}

	label {
		position: absolute;
		width: 48px;
		height: 48px;
		background: #ff9000;
		border-radius: 50%;
		right: 10px;
		bottom: 0;
		border: 0;
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;

		transition: background-color 0.2s;

		input {
			display: none;
		}

		svg {
			width: 20px;
			height: 20px;
			color: #312e38;
		}

		&:hover {
			background: ${shade(0.2, '#ff9000')}
		}
	}
`
