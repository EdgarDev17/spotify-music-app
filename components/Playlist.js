import Image from 'next/image'

export const Playlist = ({ name, cover, totalTracks }) => {
	return (
		<div className='mx-1'>
			<div className='w-40'>
				<Image
					alt={'Playlist cover image'}
					src={cover}
					width={200}
					height={200}
				/>
                <p className='text-white'>{name}</p>
                <p className='text-white text-sm'>{`${totalTracks} songs`}</p>
			</div>
		</div>
	)
}
