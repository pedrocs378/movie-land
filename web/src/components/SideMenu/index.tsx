import React, { useCallback } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiArrowToLeft } from 'react-icons/bi'
import { GiClapperboard, GiPopcorn } from 'react-icons/gi'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'

import defaultImg from '../../assets/avatar-default.gif'

import {
	Container,
	Content,
	Navigation,
	ProfileContainer,
	TitleContainer
} from './styles'
import { useShowMenu } from '../../hooks/menu'


const SideMenu: React.FC = () => {
	const { user, signOut } = useAuth()
	const { show, setShow } = useShowMenu()

	const history = useHistory()

	const handleReduceName = useCallback((name: string) => {
		const nameSplited = name.split(' ')

		return nameSplited[0]
	}, [])

	const handleSignInOrSignOut = useCallback(() => {
		if (user) {
			signOut()
		} else {
			history.push('/login')
		}

	}, [user, signOut, history])

	return (
		<Container show={show} >
			<Content>
				<TitleContainer>
					<Link to="/" >
						<GiClapperboard />

						<h1>MOVIE<span>LAND</span></h1>
					</Link>

					<button type="button" onClick={() => setShow(false)} >
						<BiArrowToLeft />
					</button>
				</TitleContainer>

				<ProfileContainer>
					<Link to={ user ? "/profile" : "/login" }>
						<img src={user ? user.avatar_url : defaultImg} alt={user ? user.name : "Stranger"} />

						<span>{ user ? handleReduceName(user.name) : "Stranger" }</span>

						<AiOutlineEdit />
					</Link>
				</ProfileContainer>

				<Navigation>
					<h4>Media</h4>

					<Link to="/">
						<GiPopcorn />
						Movies
					</Link>
					<Link to="/watchlist">
						<BsBookmark />
						Saved
					</Link>
				</Navigation>
			</Content>

			<button onClick={handleSignInOrSignOut} >
				{ user ? "Sign Out" : "Sign In" }
			</button>
		</Container>
	)
}

export default SideMenu
