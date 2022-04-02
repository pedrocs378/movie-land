import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

const fadeFromUp = keyframes`
	from {
		transform: translateY(-8%);
		opacity: 0;
	}
	to {
		transform: translateY(0%);
		opacity: 1;
	}
`

export const Container = styled.div`
	grid-area: content;

	margin: 80px auto;
	height: 300px;
	width: 95%;
	max-width: 400px;
	padding: 0 30px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	border-radius: 8px;
	background: rgba(0, 0, 0, 0.15);

	animation: ${fadeFromUp} 900ms;

	h1 {
		color: #fff;
		font-size: 25px;
		margin-bottom: 35px;
	}

	> button {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 50px;
		width: 100%;
		border-radius: 5px;
		background: #ff9000;
		color: #312e38;
		font-size: 1rem;
		line-height: 24px;
		font-weight: bold;

		transition: ease 0.3s;

		svg {
			height: 24px;
			width: 24px;
			margin-right: 7px;
		}

		& + button {
			margin-top: 10px;
		}

		&.google {
			background: #fff;
			color: #24292D;

			&:hover {
				background: ${shade(0.15, '#fff')};	
			}
		}

		&.github {
			background: #24292D;
			color: #fff;

			&:hover {
				background: ${shade(0.15, '#24292D')};
			}
		}
	}

	@media (min-width: 670px) {
		width: 100%;
	}
`
