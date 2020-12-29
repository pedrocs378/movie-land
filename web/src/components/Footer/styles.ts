import { setLightness } from 'polished'
import styled from 'styled-components'

interface ContainerProps {
	isShowllableMenu: boolean
}

export const Container = styled.footer<ContainerProps>`
	grid-area: footer;

	color: white;
	font-size: 15px;

	display: flex;
	align-items: center;
	justify-content: center;

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
