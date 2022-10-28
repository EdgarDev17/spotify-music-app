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
    <>
      <div className={'container mx-auto'}>
        <h1 className={'font-bold text-xl text-center my-5'}>
          Welcome to the band, my friend!
        </h1>

        <p className={'text-md my-5 text-center'}>
          Login with your spotify account to enjoy this app!
        </p>
      </div>

      <div className={'flex justify-center flex-col mx-5 lg:mx-96'}>
        {provider}
      </div>
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
