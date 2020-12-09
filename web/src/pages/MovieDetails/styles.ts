import styled from 'styled-components'

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
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-areas: "infos cast";

`

export const ColumnInfos = styled.div`
	grid-area: infos;

	> img {
		border-radius: 8px;
		height: 450px;
		max-width: 100%;
	}

	div {
		display: flex;

		section + section {
			margin-left: 20px;

			padding-left: 30px;
			border-left: 1px solid rgba(194, 195, 197, 0.2);
		}
	}
`
export const ColumnCast = styled.div`
	grid-area: cast;
	margin-left: 15px;

	h1 {
		color: white;
		font-size: 24px;
		margin-bottom: 15px;
	}

	> div {
		display: flex;
		align-items: center;

		img {
			height: 50px;
			width: 40px;
			border-radius: 50%;
		}

		div {
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
	}

	> div + div {
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

export const Description = styled.div`
	margin-top: 30px;

	h1 {
		color: white;
		font-size: 24px;
	}

	p {
		color: #c2c3c5;
		font-size: 15px;
		margin-top: 15px;
	}
`

export const Recommendations = styled.div`
	margin-top: 25px;

	h1 {
		color: white;
		font-size: 24px;
	}
`

export const ListMovies = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 10px;
`
