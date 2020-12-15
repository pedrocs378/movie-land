import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
	grid-area: content;

	display: flex;
	flex-direction: column;
	justify-self: center;

	width: 95%;
	max-width: 1500px;
	margin: 0 auto;
	padding-bottom: 10px;

	h1 {
		color: white;
		font-size: 24px;
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
	justify-content: space-between;

	margin-bottom: 15px;
`
