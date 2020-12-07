import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
	}

	body {
		background: #343d4e;
		-webkit-font-smoothing: antialiased;
	}

	body, input, button {
		font-family: 'Roboto Condensed', sans-serif
	}

	button {
		cursor: pointer;
	}
`
