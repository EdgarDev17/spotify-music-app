import { getTopTracks } from '../../lib/spotify'

export default async function handler(req, res) {
    const response = await getTopTracks()
    const tracks = response.json()

    const tracksArr = tracks.items.map((track)=> track.name)

    res.status(200).json({tracksArr})
}
