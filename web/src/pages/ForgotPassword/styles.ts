import { shade } from 'polished'
import styled, { keyframes } from 'styled-components'

const fade = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`

export const Container = styled.div`
	grid-area: content;

	height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 400px;
		padding: 30px 0;
		border-radius: 6px;
		box-shadow: 0 0 10px 0 #000;
		background: ${shade(0.2, '#343d4e')};

		animation: ${fade} 1s;

		h1 {
			color: #f0f0f0;
			font-size: 25px;
			margin-bottom: 30px;
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

			&:hover {
				background: ${shade(0.1, '#ff9000')}
			}
		}

	}

	> a {
		color: #c2c3c5;
		margin-top: 30px;
		transition: color 0.1s;
		text-decoration: none;
		font-size: 18px;

		display: flex;
		align-items: center;

		svg {
			margin-right: 5px;
			height: 22px;
			width: 22px;
		}

		&:hover {
			color: ${shade(0.1, '#c2c3c5')}
		}
	}
`
