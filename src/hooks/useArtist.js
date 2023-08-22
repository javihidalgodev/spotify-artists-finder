import { useState } from "react"
import { getToken } from "../services/token"

export const useArtist = () => {
  const [artist, setArtist] = useState()

  const handleFollowers = (followers) => {
    const length = followers.toString().length

    if (length >= 4 && length < 7) {
      return Math.round(followers / 1000) + 'K'
    } else if (length >= 7) {
      return Math.round(followers / 1000000) + 'M'
    }

    return followers
  }

  const getArtist = async (id) => {
    const token = await getToken()

    const artistParameters = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await fetch('https://api.spotify.com/v1/artists/' + id , artistParameters)
    const json = await response.json()

    const artistRes = json

    const mappedArtist = {
      id: artistRes.id,
      name: artistRes.name,
      image: artistRes.images[0],
      spotifyLink: artistRes.external_urls.spotify,
      followers: artistRes.followers.total
    }

    mappedArtist.followers = handleFollowers(mappedArtist.followers)

    setArtist(mappedArtist)
  }

  return { artist, getArtist }
}