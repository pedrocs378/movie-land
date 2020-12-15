import { setLightness } from 'polished'
import styled from 'styled-components'

export const Container = styled.footer`
	grid-area: footer;

	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 15px;

	span {
		svg {
			margin: 0 5px;
			color: #ff9000;
		}

		a {
			text-decoration: none;
			margin-left: 5px;
			color: #c2c3c5;
			transition: color 0.1s;
		}

		a:hover {
			color: ${setLightness(0.9, '#c2c3c5')}
		}

	}
`
