import withResults from '../mocks/with-results.json'
import noResults from '../mocks/no-results.json'
import { useState } from 'react'

export default function useArtists ({ query, token }) {
  const [responseArtistsList, setResponseArtistsList] = useState([])

/*   const artists = withResults.artists.items

  const mappedArtists = artists?.map(item => ({
    id: item.id,
    name: item.name,
    image: item.images[0].url,
    link: item.external_urls.spotify,
    followers: item.followers.total
  })) */

  const getArtistsList = async () => {
    if (query) {
      const artistParameters = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      try {
        const res = await fetch('https://api.spotify.com/v1/search?q=' + query + '&type=artist', artistParameters)
        const json = await res.json()
        
        const artistsList = json.artists.items

        const mappedArtists = artistsList?.map(item => ({
          id: item.id,
          name: item.name,
          image: item.images[0],
          spotifyLink: item.external_urls.spotify,
          followers: item.followers.total
        }))
  
        setResponseArtistsList(mappedArtists)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return {responseArtistsList, getArtistsList}
}