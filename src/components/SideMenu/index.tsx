import React, { useCallback, useMemo } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiArrowToLeft } from 'react-icons/bi'
import { GiClapperboard, GiPopcorn } from 'react-icons/gi'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useAuth } from '../../hooks/auth'
import { useShowMenu } from '../../hooks/menu'

import {
	Container,
	Content,
	Navigation,
	ProfileContainer,
	TitleContainer
} from './styles'


const SideMenu: React.FC = () => {
	const { user, signOut } = useAuth()
	const { show, setShow } = useShowMenu()

	const router = useRouter()

	const handleSignInOrSignOut = useCallback(() => {
		if (user) {
			signOut()
		} else {
			router.push('/signin')
		}

	}, [user, signOut, router])

	const userName = useMemo(() => {
		return user?.name.split(' ')[0] ?? 'Stranger'
	}, [user])

	return (
		<Container show={show} >
			<Content>
				<TitleContainer>
					<Link href="/" >
						<a>
							<GiClapperboard />

							<h1>MOVIE<span>LAND</span></h1>
						</a>
					</Link>

					<button type="button" onClick={() => setShow(false)} >
						<BiArrowToLeft />
					</button>
				</TitleContainer>

				<ProfileContainer>
					<Link href={user ? "/profile" : "/signin"}>
						<a>
							<img
								src={user ? user.avatar_url : '/images/avatar-default.png'}
								alt={user ? user.name : "Stranger"}
							/>

							<span>{userName}</span>

							<AiOutlineEdit />
						</a>
					</Link>
				</ProfileContainer>

				<Navigation>
					<h3>Media</h3>

					<Link href="/">
						<a>
							<GiPopcorn />
							Movies
						</a>
					</Link>
					<Link href="/watchlist">
						<a>
							<BsBookmark />
							Saved
						</a>
					</Link>
				</Navigation>
			</Content>

			<button type="button" onClick={handleSignInOrSignOut} >
				{user ? "Sign Out" : "Sign In"}
			</button>
		</Container>
	)
}

export { SideMenu }
