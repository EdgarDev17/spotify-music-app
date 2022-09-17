export const getUserData = (userToken) =>{
    return fetch('https://api.spotify.com/v1/me', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userToken,
				},
			})
				.then((response) => response.json())
				.then((userData) => userData)
		}