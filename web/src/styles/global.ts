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

	@keyframes scaleXY {
		from {
			transform: scale(1.11, 1.11)
		}
		to {
			transform: scale(1, 1)
		}
	}

	@keyframes fadeFromUp {
		from {
			transform: translateY(-20%);
			opacity: 0;
		}
		to {
			transform: translateY(0%);
			opacity: 1;
		}
	}

	@keyframes fadeFromDown {
		from {
			transform: translateY(30%);
			opacity: 0;
		}
		to {
			transform: translateY(0%);
			opacity: 1;
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`
