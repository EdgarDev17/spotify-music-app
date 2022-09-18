import React, { useEffect, useState } from 'react'
import { useSession, getSession } from 'next-auth/react'
import AccessDenied from './../../components/AccessDenied'
import Banner from './../../components/Banner'
import { getArtists } from './../../lib/getArtists'
import { getUserData } from './../../lib/getUserData'
import Artist from './../../components/Artist'

export default function Home() {
	const { data: session, status } = useSession()
	const [currentUser, setCurrentUser] = useState(null)
	const [topTracks, setTopTracks] = useState([])
	const [playlists, setPlaylists] = useState([])
	const [topArtists, setTopArtists] = useState([])
	const [isLogged, setIsLogged] = useState(false)
	const [loading, setLoading] = useState(true)

	// getting current user info
	useEffect(() => {
		if (status === 'authenticated') {
			getUserData(session.user.accessToken).then((userData) => {
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

	function renderArtistList(artistsList) {
		return artistsList
			.slice(0, 10)
			.map((artist) => (
				<Artist
					key={artist.id}
					name={artist.name}
					picture={artist.images[0].url}
				/>
			))
	}

	if (isLogged == false) {
		return <AccessDenied />
	}

	if (loading) {
		return <p> loading </p>
	} else {
		return (
			<>
				<div className='w-full h-screen bg-neutral-900'>
					<Banner
						username={currentUser.display_name}
						imgUrl={currentUser.images[0].url}
						plan={currentUser.product}
						country={currentUser.country}
					/>
					<div>
						<p className='ml-5 text-white mt-16 text-lg font-semibold'>
							My top 10 artist
						</p>
						{/* GRID CONTAINER 👍 */}
						<div className='mt-5 flex justify-start items-center overflow-scroll'>
							{loading
								? 'Loading...'
								: renderArtistList(topArtists)}
						</div>

						<p className='ml-5 text-white mt-16 text-lg font-semibold'>
							My playlists
						</p>

						<p className='ml-5 text-white mt-16 text-lg font-semibold'>
							My top 10 songs
						</p>
					</div>
				</div>
			</>
		)
	}
}
