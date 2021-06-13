import styled from 'styled-components'

export const Container = styled.div`
	height: calc(100vh - 50px);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1rem;

	div {
		position: relative;
		height: 12.5rem;
		width: 100%;
		max-width: 720px;
		border-radius: 5px;
		padding: 0 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: rgba(0, 0, 0, 0.1);

		h1 {
			display: flex;
			align-items: center;
			color: white;

			svg {
				height: 30px;
				width: 30px;
				color: #ffc50d;
				margin-right: 5px;
			}

			span {
				color: #ffc50d;
				font-weight: normal;
			}
		}

		p {
			color: #c2c3c5;
			font-size: 1.1rem;
			line-height: 1.8rem;
			margin-top: 0.5rem;
			text-align: center;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			height: 5px;
			background: #ffc50d;
		}
	}
`
