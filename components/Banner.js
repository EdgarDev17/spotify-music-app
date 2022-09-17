// black 191414

import Image from 'next/image'
const Banner = ({ imgUrl, username, plan, followers, country }) => {
	return (
		<div className='bg-neutral-900 py-5 flex flex-col justify-center items-center'>
			<Image
				alt='Spotify profile picture'
				className='rounded-full'
				width={100}
				height={100}
				src={`${imgUrl}`}
			/>
			<div className='w-full flex justify-around items-center'>
				<p className='w-20 text-center text-white mt-5'>{plan}</p>
				<p className='w-20 text-center text-white mt-5'>{username}</p>
				<p className='w-20 text-center text-white mt-5'>{country}</p>
			</div>
		</div>
	)
}

export default Banner
