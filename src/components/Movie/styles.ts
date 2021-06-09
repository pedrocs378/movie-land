import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
	isLogged: boolean
}

export const Container = styled.div<ContainerProps>`
	margin: 0 5px;
	margin-top: 10px;
	transition: transform 0.2s;

	&:hover {
		transform: scale(1.03, 1.03)
	}

	a {
		height: auto;
		width: 100%;
		position: relative;
		display: block;

		img {
			height: 100%;
			width: 100%;
			background-size: contain;

			border-radius: 4px;
		}

		button {
			position: absolute;
			right: 10px;
			top: 10px;
			padding: 5px;
			background: rgba(215, 215, 215, 0.3);
			border-radius: 5px;

			display: flex;
			align-items: center;
			justify-content: center;

			transition: background-color 0.2s;

			&:hover {
				background: ${shade(0.5, '#d7d7d7')};

				div {
					${({ isLogged }) => !isLogged && css`
						opacity: 1;
						visibility: visible;
					`}
				}
			}

			svg {
				height: 17px;
				width: 17px;
				color: white;
			}
			}
	}

	@media(min-width: 670px) {
		a {
			width: 200px;
		}
	}

`

export const ToolTip = styled.div`
	position: absolute;
	top: 100%;
	right: 0px;
	margin-top: 10px;
	padding: 2px 8px;
	text-align: right;
	width: 150px;
	border-radius: 4px;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s;

	background: #c53030;
	color: #fff;

	span {
		font-size: 13px;
	}

	&::before {
		content: '';
		border-style: solid;
		border-color: #c53030 transparent;
		border-width: 0 6px 6px 6px;
		bottom: 100%;
		top: -6px;
		position: absolute;
		right: 8px;
	}


`

export const MovieInfo = styled.footer`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 60px;

	display: flex;
	flex-direction: column;
	justify-content: center;

	border-radius: 4px;

	background: rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(8px);

	div {
		z-index: 2;
		margin: 0 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		color: white;

		h3 {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	p {
		z-index: 2;
		color: #c2c3c5;
		font-size: 14px;
		margin-top: 2px;
		margin-left: 8px;
	}
`
