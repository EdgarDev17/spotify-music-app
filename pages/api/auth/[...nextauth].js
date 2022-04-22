/*
    this file handle user session
    also create and refresh user tokens
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
	// I can store this in login.jsx into an array call providers
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],

	// this JWT has to be incripted
	// secret: process.env.JWT,
	secret: process.env.NEXTAUTH_SECRET,

	
	// setting up the url for each page
	pages: {
		signIn: 'http://localhost:3000/login',
		error: 'http://localhost:3000/error',
	},

	//some functions to handle sign in method and session method
	callbacks: {
		//this is the initial sign in
		async jwt({ token, account, user }) {
			if (account && user) {
				console.log('JWT() - Login successful 😎')
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
		async signIn({email, account, user, credentials}){
			let isAllowed = true

			if(!isAllowed){
				return 'http://localhost:3000/login'
			} 

			return isAllowed
		}
	},
})
