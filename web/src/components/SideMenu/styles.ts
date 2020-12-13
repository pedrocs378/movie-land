import styled from 'styled-components'
import { setLightness } from 'polished'

export const Container = styled.aside`
	grid-area: menu;

	height: 100vh;
	padding-top: 40px;
	background: linear-gradient(180deg, rgba(66,80,98,1) 0%, rgba(45,53,71,1) 100%);

	position: fixed;
	width: 250px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	button {
		color: #c2c3c5;
		background: transparent;
		font-size: 18px;
		text-decoration: none;
		margin-left: 18px;
		margin-bottom: 15px;
		align-self: flex-start;

		transition: color 0.2s;

		&:hover {
			color: ${setLightness(1, '#c2c3c5')}
		}
	}
`

export const Content = styled.div`
	height: 100%;
`

export const TitleContainer = styled.div`

	margin-left: 18px;

	a {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	svg {
		height: 30px;
		width: 30px;
		color: #ffc50d;
	}

	h1 {
		color: white;
		margin-left: 5px;

		span {
			color: #ffc50d;
			font-weight: normal;
		}
	}
`

export const ProfileContainer = styled.div`

	margin-top: 35px;
	margin-left: 18px;

	a {
		display: flex;
		align-items: center;
		text-decoration: none;

		img {
			height: 46px;
			width: 46px;
			border-radius: 50%;

			border: 2px solid #c2c3c5;
		}

		span {
			margin-left: 8px;
			color: #c2c3c5;
		}

		svg {
			height: 22px;
			width: 22px;
			color: #c2c3c5;
			margin-left: 5px;
		}
	}

	&:hover {
		span {
			text-decoration: underline;
		}
	}

`

export const Navigation = styled.nav`
	margin: 50px 0;

	display: flex;
	flex-direction: column;

	h4 {
		margin-bottom: 20px;
		color: #c2c3c5;
		margin-left: 18px;
	}

	a {
		color: #c2c3c5;
		padding: 7px 14px;
		text-decoration: none;
		border-left: 4px solid transparent;

		display: flex;
		align-items: center;

		svg {
			margin-right: 10px;
			height: 22px;
			width: 22px;
		}

		&:hover {
			background: ${setLightness(0.3, '#2f374a')};
			border-left-color: #ffc50d;
			color: #ffc50d;
		}
	}
`
