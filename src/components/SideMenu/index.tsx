import React, { forwardRef } from 'react'
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

const SideMenu = () => {
	const [session, sessionLoading] = useSession()
	const router = useRouter()

	const { show, setShow } = useShowMenu()

	const handleSignInOrSignOut = () => {
		setShow(false)

		if (session) {
			signOut()
		} else {
			router.push('/signin')
		}

	}

	return (
		<Container show={show}>
			<Content>
				<TitleContainer>
					<Link href="/">
						<a onClick={() => setShow(false)}>
							<GiClapperboard />

							<h1>MOVIE<span>LAND</span></h1>
						</a>
					</Link>

					<button type="button" onClick={() => setShow(false)}>
						<BiArrowToLeft />
					</button>
				</TitleContainer>

				<ProfileContainer>
					<Link href={session ? "/profile" : "/signin"}>
						<a onClick={() => setShow(false)}>
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
						<a onClick={() => setShow(false)}>
							<GiPopcorn />
							Movies
						</a>
					</Link>
					<Link href="/watchlist">
						<a onClick={() => setShow(false)}>
							<BsBookmark />
							Saved
						</a>
					</Link>
				</Navigation>
			</Content>

			<button type="button" onClick={handleSignInOrSignOut}>
				{session ? "Sign Out" : "Sign In"}
			</button>
		</Container>
	)
}

export { SideMenu }
