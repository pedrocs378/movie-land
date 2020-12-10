import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
	margin-top: 10px;
	transition: transform 0.2s;

	&:hover {
		transform: scale(1.03, 1.03)
	}

	div {
		height: 300px;
		width: 200px;
		position: relative;

		img {
			height: 100%;
			width: 100%;
			background-size: contain;

			border-radius: 4px;
		}

		button {
			position: absolute;
			right: 10px;
			top: 10px;
			padding: 5px;
			background: rgba(215, 215, 215, 0.3);
			border-radius: 5px;

			display: flex;
			align-items: center;
			justify-content: center;

			transition: background-color 0.2s;

			&:hover {
				background: ${shade(0.5, '#d7d7d7')}
			}

			svg {
				height: 17px;
				width: 17px;
			}
		}

		div {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 60px;

			display: flex;
			flex-direction: column;
			justify-content: center;

			border-radius: 4px;

			.blur {
				height: 100%;
				width: 100%;
				background: rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(8px);
				z-index: 1;
			}

			h3 {
				z-index: 2;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				color: white;
				margin: 0 8px;
			}

			p {
				z-index: 2;
				color: #c2c3c5;
				font-size: 14px;
				margin-top: 2px;
				margin-left: 8px;
			}
		}
	}
`
