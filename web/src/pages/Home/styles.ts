import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.main`
	grid-area: content;

	display: flex;
	flex-direction: column;
	justify-self: center;

`

export const MovieSection = styled.section`

	& + section {
		margin-top: 20px;
	}

	> div {
		margin-bottom: 15px;

		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		h1 {
			color: white;
		}

		button {
			background: transparent;
			color: white;
			font-size: 14px;
			border: 0;
			transition: color 0.2s;

			&:hover {
				color: ${shade(0.2, '#fff')};
			}
		}
	}
`

export const ListMovies = styled.div`
	/* display: flex; */
`

export const Movie = styled.div`

	transition: transform 0.2s;

	&:hover {
		transform: translateY(-2%)
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
			background: rgba(215, 215, 215, 0.2);
			border-radius: 50%;

			display: flex;
			align-items: center;
			justify-content: center;

			transition: background-color 0.2s;

			&:hover {
				background: ${shade(0.6, '#d7d7d7')}
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
