import { shade } from 'polished'
import styled, { css } from 'styled-components'

interface ColumnInfosProps {
	movieSaved: boolean
	isLogged: boolean
}

export const Container = styled.div`
	grid-area: content;

	display: flex;
	flex-direction: column;
	justify-self: center;

	width: 95%;
	max-width: 1500px;
	margin: 0 auto;
`

export const GridDetails = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: 670px) {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas: "infos cast";
	}

`

export const ColumnInfos = styled.div<ColumnInfosProps>`
	grid-area: infos;
	display: flex;
	flex-direction: column;

	img.movie-cover {
		border-radius: 8px;
		width: 100%;
		max-width: 820px;
	}

	button {
		position: relative;
		margin-top: 15px;
		width: 150px;
		height: 45px;
		border-radius: 6px;
		color: #312e38;
		font-size: 18px;
		font-weight: bold;

		display: flex;
		align-items: center;
		justify-content: center;

		transition: background-color 0.2s;

		svg {
			height: 20px;
			width: 20px;
			margin-right: 5px;
		}

		${({ movieSaved }) => movieSaved ? css`
			background: #ff3c3c;

			&:hover {
			background: ${shade(0.1, '#ff3c3c')}
		}
		` : css`
			background: #28c900;

			&:hover {
			background: ${shade(0.1, '#28c900')}
		}
		` }

		&:hover {
			${({ isLogged }) => !isLogged && css`
				div {
					opacity: 1;
					visibility: visible;
				}
			` }
		}

		&:disabled {
			opacity: 0.7;
			cursor: default;
		}

	}

	div.row {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 620px) {
		div.row {
			flex-direction: row;
			align-items: center;

			section + section {
				margin-left: 20px;

				padding-left: 30px;
				border-left: 1px solid rgba(194, 195, 197, 0.2);
			}
		}
	}
`

export const ToolTip = styled.div`
	position: absolute;
	top: -6px;
	left: 108%;
	margin-top: 10px;
	padding: 2px 8px;
	text-align: right;
	width: 150px;
	border-radius: 4px;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s;

	background: #c53030;
	color: #fff;

	span {
		font-size: 13px;
		color: #312e38;
	}

	&::before {
		content: '';
		border-style: solid;
		border-color: transparent #c53030;
		border-width: 6px 6px 6px 0;
		right: 100%;
		top: 30%;
		position: absolute;
	}
`

export const ColumnCast = styled.div`
	grid-area: cast;
	margin-top: 20px;

	h1 {
		color: white;
		font-size: 24px;
		margin-bottom: 15px;
	}

	@media (min-width: 670px) {
		margin-top: 0;
		margin-left: 15px;
	}
`

export const CastItem = styled.div`
	display: flex;
	align-items: center;

	img {
		height: 50px;
		width: 50px;
		border-radius: 50%;
	}

	div.info {
		margin-left: 10px;

		h2 {
			color: white;
			font-size: 18px;
			font-weight: normal;
		}

		p {
			color: #c2c3c5;
			font-size: 15px;
		}
	}

	& + div {
		margin-top: 20px;
	}
`

export const Section = styled.section`
	display: flex;
	flex-direction: column;
	margin-top: 25px;

	h1 {
		color: white;
		font-size: 24px;
		display: flex;

		.MuiRating-readOnly {
			margin-left: 30px;
			align-self: center;

			.MuiRating-iconFilled {
				color: #ffc50d;
			}
		}
	}

	p {
		color: #c2c3c5;
		font-size: 15px;
		margin-top: 5px;
	}

	ul {
		display: flex;

		li {
			list-style: none;
			color: #c2c3c5;
			font-size: 15px;
			margin-top: 5px;
		}

		li + li {
			margin-left: 10px;
		}
	}

	div {
		display: flex;
		align-items: center;

		svg {
			margin-left: 10px;
			height: 25px;
			width: 25px;
			color: #ffc50d;
		}
	}
`

export const Recommendations = styled.div`
	margin-top: 25px;
	width: 100%;

	h1 {
		color: white;
		font-size: 24px;
		margin-bottom: 10px;
	}
`

export const ListMovies = styled.div`
	display: flex;
	flex-wrap: wrap;

	margin-bottom: 20px;

	gap: 10px;
`
