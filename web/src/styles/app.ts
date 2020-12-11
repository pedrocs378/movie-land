import styled from 'styled-components'

export const GridArea = styled.div`
	display: grid;
	grid-template-columns: 250px 1fr;
	grid-template-rows: 120px auto 50px;
	grid-template-areas:
		"menu header"
		"menu content"
		"menu footer";

	position: relative;
`
