import React, { useEffect, useState } from 'react'
import { useSession, getSession } from 'next-auth/react'
import AccessDenied from '../../components/AccessDenied'
import Banner from '../../components/Banner'
import { getArtists, getTracks } from '../../lib/getArtists'
import { getUserData } from '../../lib/getUserData'
import Artist from '../../components/Artist'
import { Playlist } from '../../components/Playlist'
import { getPlaylists } from '../../lib/getPlaylists'
import AuthButton from '../../components/authbutton'

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

	// getting home data from spotify API
	useEffect(() => {
		if (status === 'authenticated' && currentUser) {
			let token = session.user.accessToken
			getArtists(token).then((artists) => setTopArtists(artists.items))

			getPlaylists(token, currentUser.id).then((playlists) =>
				setPlaylists(playlists)
			)

			getTracks(token)
				.then((response) => setTopTracks(response.items))
				.catch((err) => console.log(err))
		}
	}, [status, session, currentUser])

	function renderArtistList(artistsList) {
		return artistsList
			.slice(0, 10)
			.map((artist) => (
				<Artist
					key={artist.id}
					name={artist.name}
					picture={artist.images[0].url}
					rounded={true}
				/>
			))
	}

	function renderPlaylists(playlistsParam) {
		return playlistsParam.map((playlist) => {
			return (
				<Playlist
					key={playlist.id}
					name={playlist.name}
					cover={playlist.images[0].url}
					totalTracks={playlist.tracks.total}
				/>
			)
		})
	}

	function renderTracks(tracks) {
		return tracks.map((track) => {
			return (
				<Artist
					name={track.name}
					key={track.id}
					picture={track.album.images[0].url}
				/>
			)
		})
	}

	if (isLogged == false) {
		return <AccessDenied />
	}

	if (loading) {
		return <p> loading </p>
	} else {
		return (
			<>
				<div className='w-full md:h-full bg-neutral-900'>
					<Banner
						username={currentUser.display_name}
						imgUrl={currentUser.images[0].url}
						plan={currentUser.product}
						country={currentUser.country}
					/>
						<AuthButton/>
					<div>
						<p className='ml-5 text-white mt-16 text-lg font-semibold'>
							My top 10 artist
						</p>
						{/* GRID CONTAINER 👍 */}
						<div className='mt-5 flex justify-start items-center overflow-scroll md:gap-x-7 snap-x md:overflow-x-scroll md:scrollbar-hide'>
							{loading
								? 'Loading...'
								: renderArtistList(topArtists)}
						</div>

						<p className='ml-5 text-white mt-16 text-lg font-semibold '>
							My playlists
						</p>
						<div className='mt-5 flex justify-start items-center overflow-scroll md:gap-x-5 md:scrollbar-hide'>
							{loading
								? 'Loading...'
								: renderPlaylists(playlists)}
						</div>

						<p className='ml-5 text-white mt-16 text-lg font-semibold'>
							My top 10 songs
						</p>
						<div className='mt-5 flex justify-start items-center overflow-scroll md:gap-x-5 md:scrollbar-hide'
						>{renderTracks(topTracks)}</div>
					</div>
				</div>

			</>
		)
	}
}
