import styled from 'styled-components'

export const GridArea = styled.div`
	position: relative;

	display: flex;
	flex-direction: column;

	@media(min-width: 670px) {
		display: grid;
		grid-template-rows: 120px auto 50px;
		grid-template-columns: 250px 1fr;
		grid-template-areas:
			"menu header"
			"menu content"
			"menu footer";
	}


`
