import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface MovieSectionProps {
	isHidden: boolean
}

export const Container = styled.main`
	grid-area: content;

	display: flex;
	flex-direction: column;
	justify-self: center;

	width: 95%;
	max-width: 1500px;
	margin: 0 auto;

`

export const MovieSection = styled.section<MovieSectionProps>`
	margin-top: 30px;
	margin-bottom: 10px;

	${({ isHidden }) => isHidden && css`
		display: none;
	`}

	header {
		margin-bottom: 10px;

		display: flex;
		align-items: center;

		h1 {
			color: white;
			margin-right: 0.75rem;
		}

		button {
			margin-left: auto;
			background: transparent;
			color: white;
			font-size: 14px;
			text-decoration: none;
			transition: color 0.2s;

			&:hover {
				color: ${shade(0.2, '#fff')};
			}
		}
	}

	.MuiPagination-root {

		.MuiPaginationItem-root {
			color: #fff;
			font-weight: bold;
		}

		.MuiPaginationItem-page {
			background: #4d5a6d;
			border-width: 2px;
			border-color: transparent;
		}

		.MuiPaginationItem-page:hover {
			background: ${shade(0.2, '#4d5a6d')};
		}

		.Mui-selected {
			border-color: #ffc50d;
			color: #ffc50d;
		}
	}
`

export const ListMovies = styled.div`
	display: flex;
	flex-wrap: wrap;

	margin-bottom: 15px;

	gap: 10px;
`