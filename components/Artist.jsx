import Image from 'next/image'

const Artist = ({ name, picture }) => {
	return (
		<div>
			<Image
				alt='Artist profile picture'
				className='rounded-full'
				width={100}
				height={100}
                src={picture}
			/>
			<p>{name}</p>
		</div>
	)

}

export default Artist
