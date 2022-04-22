import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
	'user-read-email',
	'playlist-read-private',
	'playlist-read-collaborative',
	'streaming',
	'user-read-private',
	'user-library-read',
	'user-top-read',
	'user-read-playback-position'
].join(',')

const params = {
	scope: scopes,
}

const querystring = new URLSearchParams(params)
const LOGIN_URL = 'https://accounts.spotify.com/authorize?' + querystring

const webApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_SECRET,
})


export default webApi
export{LOGIN_URL}