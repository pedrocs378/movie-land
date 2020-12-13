import { setLightness } from 'polished'
import styled from 'styled-components'

export const Container = styled.footer`
	grid-area: footer;

	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 15px;
	padding-top: 50px;
	padding-bottom: 10px;
	svg {
		margin: 0 5px;
		color: #0056ff;
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
`
