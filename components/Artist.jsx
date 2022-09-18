import Image from 'next/image'

const Artist = ({ name, picture }) => {
	return (
		<div className='mx-1'>
			<div className='flex items-center justify-center'>
				<Image
					alt='Artist profile picture'
					className='rounded-full'
					width={150}
					height={150}
					src={picture}
				/>
			</div>

			<div className='w-40 text-white flex justify-center my-2'>
				<p>{name}</p>
			</div>
		</div>
	)
}

export default Artist
