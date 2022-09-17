// This lib folder is only for fetching data, no react code.

export const getArtists = (userToken) =>{
    return fetch('https://api.spotify.com/v1/me/top/artists', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userToken,
				},
			})
				.then((response) => response.json())
				.then((topItems) => topItems)
				.catch((err) => console.log('TOP TRACKS ERROR: ' + err))
}