import React, { useEffect, useState } from 'react'
import { useSession, getSession } from 'next-auth/react'
import AccessDenied from './../../components/AccessDenied'
import Banner from './../../components/Banner'
import { getArtists } from './../../lib/getArtists'
import { getUserData } from './../../lib/getUserData'

export default function Home() {
	const { data: session, status } = useSession()
	const [currentUser, setCurrentUser] = useState(null)
	const [topTracks, setTopTracks] = useState({})
	const [topArtists, setTopArtists] = useState([])
	const [isLogged, setIsLogged] = useState(false)
	const [loading, setLoading] = useState(true)

	// getting current user info
	useEffect(() => {
		if (status === 'authenticated') {
			getUserData(session.user.accessToken)
			.then(userData => {
				setCurrentUser(userData)
				setLoading(false)
				setIsLogged(true)
			})
		}
	}, [session, status])

	// getting user top artists list
	useEffect(() => {
		if (status === 'authenticated') {
			getArtists(session.user.accessToken).then((artists) =>
				setTopArtists(artists.items)
			)
		}
	}, [status, session])

	if (isLogged == false) {
		return <AccessDenied />
	}

	if (loading) {
		return <p> loading </p>
	} else {
		return (
			<>
				<div>
					<Banner
						username={currentUser.display_name}
						imgUrl={currentUser.images[0].url}
						plan={currentUser.product}
						country={currentUser.country}
					/>
					<div>
						
					</div>
				</div>

			</>
		)
	}
}
