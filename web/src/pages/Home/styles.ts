import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.main`
	grid-area: content;

	display: flex;
	flex-direction: column;
	justify-self: center;

	width: 95%;
	max-width: 1500px;
	margin: 0 auto;

`

export const MovieSection = styled.section`

	& + section {
		margin-top: 40px;
	}

	> div:first-child {
		margin-bottom: 10px;

		display: flex;
		align-items: center;
		justify-content: space-between;

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
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`
