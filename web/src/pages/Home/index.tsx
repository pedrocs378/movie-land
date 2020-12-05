import React from 'react'
import { GiClapperboard, GiPopcorn } from 'react-icons/gi'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineEdit, AiOutlineStar } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'

import {
	Container,
	SideMenu,
	TitleContainer,
	ProfileContainer,
	Navigation,
	Content,
	SearchInput,
	MovieSection
} from './styles'

const Home: React.FC = () => {

	return (
		<Container>
			<SideMenu>
				<TitleContainer href="/" >
					<GiClapperboard />

					<h1>MOVIE<span>LAND</span></h1>
				</TitleContainer>

				<ProfileContainer href="/" >
					<img src="https://pbs.twimg.com/profile_images/1241471716213342209/cepHHPSo_400x400.jpg" alt="Pedro César" />

					<span>Pedro César</span>

					<AiOutlineEdit />
				</ProfileContainer>

				<Navigation>
					<h4>Media</h4>

					<a href="/">
						<GiPopcorn />
						Movies
					</a>
					<a href="/">
						<AiOutlineStar />
						Rated
					</a>
				</Navigation>

				<Navigation>
					<a href="/">
						<BsBookmark />
						Saved
					</a>
				</Navigation>

				<a href="">
					Sign Out
				</a>
			</SideMenu>

			<Content>
				<SearchInput>
					<input name="movie" placeholder="Search..." />
					<button>
						<FiSearch />
					</button>
				</SearchInput>
			</Content>
		</Container>
	)
}

export default Home
