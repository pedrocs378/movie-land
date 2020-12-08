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
	grid-template-columns: 1fr 250px;
	grid-template-areas: "infos cast";

`

export const ColumnInfos = styled.div`
	grid-area: infos;

	> img {
		border-radius: 8px;
		height: 450px;
		max-width: 100%;
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
	align-items: center;
	margin-top: 20px;

	& + section {
		align-items: flex-start;
		flex-direction: column;
	}

	h1 {
		color: white;
		font-size: 24px;
	}

	p {
		color: #c2c3c5;
		font-size: 15px;
		margin-top: 8px;
	}

	div {
		width: 350px;
		h1{
			display: flex;
			justify-content: space-between;

			span {
				color: #ffc50d;
			}
		}
	}

	div + div {
		margin-left: 30px;
		padding-left: 30px;
		border-left: 1px solid rgba(194, 195, 197, 0.2);

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
	margin-top: 30px;

	h1 {
		color: white;
		font-size: 24px;
		margin-bottom: 10px;
	}
`

export const ListMovies = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`
