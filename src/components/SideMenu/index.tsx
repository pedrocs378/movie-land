import React, { useCallback } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { BiArrowToLeft } from 'react-icons/bi'
import { GiClapperboard, GiPopcorn } from 'react-icons/gi'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/client'
import Link from 'next/link'
import Skeleton from '@material-ui/lab/Skeleton'

import { useShowMenu } from '../../contexts/menu'

import {
	Container,
	Content,
	Navigation,
	ProfileContainer,
	TitleContainer
} from './styles'


const SideMenu: React.FC = () => {
	const [session, sessionLoading] = useSession()
	const { show, setShow } = useShowMenu()

	const router = useRouter()

	const handleSignInOrSignOut = useCallback(() => {
		if (session) {
			signOut()
		} else {
			router.push('/signin')
		}

	}, [session, signOut, router])

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
					<Link href={session ? "/profile" : "/signin"}>
						<a>
							{sessionLoading ? (
								<>
									<Skeleton variant="circle">
										<img
											src="/images/avatar-default.png"
											alt="Stranger"
										/>
									</Skeleton>

									<Skeleton variant="text">
										<span>Stranger</span>

										<AiOutlineEdit />
									</Skeleton>
								</>
							) : (
								<>
									<img
										src={session ? session.user.image : '/images/avatar-default.png'}
										alt={session ? session.user.name : "Stranger"}
									/>

									<span>{session?.user.name || "Stranger"}</span>
									<AiOutlineEdit />
								</>
							)}
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
				{session ? "Sign Out" : "Sign In"}
			</button>
		</Container>
	)
}

export { SideMenu }
