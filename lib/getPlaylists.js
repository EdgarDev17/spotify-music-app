export function getPlaylists(accessToken, userId) {
	return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + accessToken,
		},
	})
		.then((response) => response.json())
		.then((playlists) => playlists.items)
}
