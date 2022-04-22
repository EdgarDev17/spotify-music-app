// providers:
import { getProviders, signIn } from 'next-auth/react'

export default function Login({ providers }) {
	let provider = Object.values(providers).map((provider) => {
		return (
			<button
				className='bg-black text-white px-5 py-3 rounded'
				key={provider.name}
				onClick={() => {
					return signIn(provider.id, { callbackUrl: '/home' })
				}}
			>
				{provider.name}
			</button>
		)
	})

	return (
		<>
			<h1>
				Welcome to Spotify story maker, to enojoy this app you have to
				login
			</h1>
			{provider}
		</>
	)
}

export const getServerSideProps = async () => {
	const providers = await getProviders()

	return {
		props: {
			providers,
		},
	}
}
