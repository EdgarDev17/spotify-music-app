// providers:
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Login({ providers }) {
	let provider = Object.values(providers).map((provider) => {
		return (
			<button
				className={'bg-green-500 text-white px-10 py-3 rounded'}
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
		<div className='bg-gray-900 w-full h-screen overflow-y-hidden flex flex-col justify-center items-center'>
			<div className={'container mx-auto'}>
				<h1 className={' text-white font-bold text-xl sm:text-5xl text-center sm:mb-5'}>
					Welcome to the band, my friend!
				</h1>

				<p className={'text-white text-sm my-5 sm:mt-10 sm:mb-10 md:text-lg text-center'}>
					Login to know about your music taste
				</p>
			</div>

			<div className={'flex justify-center flex-col'}>
				{provider}
			</div>
		</div>
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
