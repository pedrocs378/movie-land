import styled, { css } from 'styled-components'
import { setLightness, shade } from 'polished'

interface SearchInputProps {
	isFocused: boolean
}

export const Container = styled.div`
	display: grid;
	grid-template-columns: 250px 1fr;
	grid-template-areas: "menu content";
`

export const SideMenu = styled.aside`
	grid-area: menu;

	height: 100vh;
	padding-top: 40px;
	background: linear-gradient(180deg, rgba(66,80,98,1) 0%, rgba(45,53,71,1) 100%);

	position: relative;

	button {
		color: #c2c3c5;
		background: transparent;
		font-size: 18px;
		text-decoration: none;
		margin-left: 18px;

		position: absolute;
		bottom: 18px;

		transition: color 0.2s;

		&:hover {
			color: ${setLightness(1, '#c2c3c5')}
		}
	}

`

export const TitleContainer = styled.a`

	display: flex;
	align-items: center;
	margin-left: 18px;
	text-decoration: none;

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

export const ProfileContainer = styled.a`

	margin-top: 25px;
	margin-left: 18px;
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

	&:hover {
		span {
			text-decoration: underline;
		}
	}
`

export const Navigation = styled.nav`
	margin-top: 50px;

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

export const Content = styled.main`
	grid-area: content;
	width: 95%;
	max-width: 1500px;
	margin: 30px 0;

	display: flex;
	flex-direction: column;
	justify-self: center;

`

export const SearchInput = styled.div<SearchInputProps>`
	width: 400px;
	align-self: flex-end;

	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 15px;
	border-radius: 4px;
	border-left: 3px solid #ffc50d;
	background: #4d5a6d;
	transition: box-shadow 0.2s;

	${({ isFocused }) => isFocused && css`
		box-shadow: 0 0 10px 0 ${shade(0.8, '#343d4e')};
	`}

	input {
		background: transparent;
		border: 0;
		color: white;
		width: 98%;

		&::placeholder {
			color: #c2c3c5;
		}

	}

	button {
		background: transparent;

		svg {
			height: 17px;
			width: 17px;
			color: #c2c3c5;
		}
	}
`

export const MovieSection = styled.section`
	margin-top: 40px;


	> div {
		margin-bottom: 20px;

		display: flex;
		align-items: center;
		justify-content: space-between;

		h1 {
			color: white;
		}

		button {
			background: transparent;
			color: white;
			font-size: 14px;
			border: 0;
			transition: color 0.2s;

			&:hover {
				color: ${shade(0.2, '#fff')};
			}
		}
	}
`

export const ListMovies = styled.div`
	display: flex;
`

export const Movie = styled.a`

	transition: transform 0.2s;

	&:hover {
		transform: translateY(-2%)
	}

	> div {
		height: 300px;
		width: 200px;
		position: relative;

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
			background: rgba(215, 215, 215, 0.2);
			border-radius: 50%;

			display: flex;
			align-items: center;
			justify-content: center;

			transition: background-color 0.2s;

			&:hover {
				background: ${shade(0.6, '#d7d7d7')}
			}

			svg {
				height: 17px;
				width: 17px;
			}
		}

		div {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 60px;

			display: flex;
			flex-direction: column;
			justify-content: center;

			border-radius: 4px;

			.blur {
				height: 100%;
				width: 100%;
				background: rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(8px);
				z-index: 1;
			}

			h3 {
				z-index: 2;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				color: white;
				margin: 0 8px;
			}

			p {
				z-index: 2;
				color: #c2c3c5;
				font-size: 14px;
				margin-top: 2px;
				margin-left: 8px;
			}
		}
	}
`
