import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		outline: 0;
		box-sizing: border-box;
	}

	body, input, button {
		font-family: 'Roboto Condensed', sans-serif
	}
`
