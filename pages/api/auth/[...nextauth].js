/*
    this file handle user session
    also it creates and refresh user tokens
*/

import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import webApi, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccToken(token) {
	try {
		webApi.setAccessToken(token.accessToken)
		webApi.setRefreshToken(token.refreshToken)
		const { body: refreshedToken } = await webApi.refreshAccessToken()
		console.log('REFRESHED TOKEN: ' + refreshedToken)

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // this token expires in one hour(3600)
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // this line is gonna replace it if new one came back
		}
	} catch (error) {
		console.log(error)

		return {
			...token,
			error: 'RefreshToken Error',
		}
	}
}

export default NextAuth({
	// this section is for setting up authentication providers
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],

	secret: process.env.secret,

	//some functions to handle sign in method and session method
	callbacks: {
		//this is the initial sign in
		async jwt({ token, account, user }) {
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					tokenExpires: account.expires_at * 1000, //In this line of code I settin up the time that token is gonna expire
				}
			}

			//If token is not expired, return previous token
			if (Date.now() < token.tokenExpires) {
				return token
			}

			return refreshAccToken(token)
		},

		session({ session, token }) {
			session.user.accessToken = token.accessToken
			session.user.refreshedToken = token.refreshToken
			session.user.username = token.username
			return session
		},
	},
})
