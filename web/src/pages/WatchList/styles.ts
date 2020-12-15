import styled from 'styled-components'

export const Container = styled.div`
	grid-area: content;

	display: flex;
	flex-direction: column;
	justify-self: center;

	width: 95%;
	max-width: 1500px;
	margin: 0 auto;
	margin-top: 30px;
	padding-bottom: 10px;

	h1 {
		color: white;
		font-size: 24px;
	}
`

export const Message = styled.div`
	height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	svg {
		height: 30px;
		width: 30px;
		color: #ffc50d;
	}

	p {
		color: #ffc50d;
		font-size: 19px;
		margin-top: 10px;
	}
`

export const ListMovies = styled.div`
	display: flex;
	flex-wrap: wrap;

	margin-bottom: 15px;
`
