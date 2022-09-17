const CURRENT_USER_ENDPOINT = 'https://api.spotify.com/v1/me'

const getCurrentUser = (token) => {
	returnfetch(CURRENT_USER_ENDPOINT, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
}

export { getCurrentUser }
