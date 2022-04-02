import styled from 'styled-components'

export const GridArea = styled.div`
	position: relative;

	display: grid;
	grid-template-columns: 100%;
	grid-template-areas:
		"header"
		"content"
		"footer";

	@media(min-width: 670px) {
		grid-template-rows: 120px auto 50px;
		grid-template-columns: 250px 1fr;
		grid-template-areas:
			"menu header"
			"menu content"
			"menu footer";
	}
`
