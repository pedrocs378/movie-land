import React from 'react'
import { AiOutlineEdit, AiOutlineStar } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { GiClapperboard, GiPopcorn } from 'react-icons/gi'
import { Link } from 'react-router-dom'

import {
	Container,
	Content,
	Navigation,
	ProfileContainer,
	TitleContainer
} from './styles'

const SideMenu: React.FC = () => {

	return (
		<Container>
			<Content>
				<TitleContainer>
					<Link to="/" >
						<GiClapperboard />

						<h1>MOVIE<span>LAND</span></h1>
					</Link>
				</TitleContainer>

				<ProfileContainer href="/" >
					<img src="https://pbs.twimg.com/profile_images/1241471716213342209/cepHHPSo_400x400.jpg" alt="Pedro César" />

					<span>Pedro César</span>

					<AiOutlineEdit />
				</ProfileContainer>

				<Navigation>
					<h4>Media</h4>

					<Link to="/">
						<GiPopcorn />
						Movies
					</Link>
					<Link to="/">
						<AiOutlineStar />
						Rated
					</Link>
				</Navigation>

				<Navigation>
					<Link to="/">
						<BsBookmark />
						Saved
					</Link>
				</Navigation>
			</Content>

			<button>
				Sign Out
			</button>
		</Container>
	)
}

export default SideMenu
