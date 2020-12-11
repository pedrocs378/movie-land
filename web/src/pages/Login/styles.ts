import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
	grid-area: content;

	height: 550px;
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

		animation: fadeFromUp 1s;

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
		}

		> button:hover {
			background: ${shade(0.1, '#ff9000')}
		}
	}

	> a {
		color: #c2c3c5;
		margin-top: 30px;
		transition: color 0.1s;

		animation: fadeFromDown 1s;

		&:hover {
			color: ${shade(0.1, '#c2c3c5')}
		}
	}
`
