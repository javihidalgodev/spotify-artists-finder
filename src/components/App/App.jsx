import { useEffect, useRef, useState } from 'react'
import useArtists from '../../hooks/useArtists'
import { useArtist } from '../../hooks/useArtist'
import ArtistsResponse from '../ArtistsResponse/ArtistsResponse'
import Modal from '../Modal/Modal'
import FooterLayout from '../FooterLayout/FooterLayout'
import { getToken } from '../../services/token'
import './App.css'

export default function App () {
  const [token, setToken] = useState()
  const [query, setQuery] = useState()
  const [modal, setModal] = useState(false)
  const isFirstInput = useRef(true)

  const { responseArtistsList, getArtistsList } = useArtists({ query, token })
  const { getArtist, artist } = useArtist()

  async function getAccessToken () {
    const newToken = await getToken()
    setToken(newToken)
  }

  const handleQuery = (e) => {
    if (e.target.value === ' ') {
      e.target.value = ''
    }
  }

  const handleQuerySubmit = (e) => {
    e.preventDefault()

    isFirstInput.current && (isFirstInput.current = false)

    const data = Object.fromEntries(new FormData(e.currentTarget))
    const query = data.query
    setQuery(query)
  }

  const handleModal = (value) => {
    setModal(value)
  }

  useEffect(() => {
    getArtistsList()
  }, [query])

  useEffect(() => {
    getAccessToken()
  }, [])

  useEffect(() => {
    modal && (document.querySelector('.modal').style.top = scrollY + 'px')
  }, [modal])

  return (
    <>
      <h1 className='main-title'>Spotify Artists Finder</h1>
      <div className="search-form">
        <form action="" onSubmit={handleQuerySubmit}>
          <input type="text" name="query" id="query" placeholder='Ed Sheeran, Maldita Nerea, Queen...' required onChange={handleQuery} />
          <button type="submit">Search</button>
        </form>
      </div>
      {
        query && (
          <div className="results">
              <ArtistsResponse artistList={responseArtistsList} handleModal={handleModal} onClick={getArtist} isFirstInput={isFirstInput}/>
          </div>
        )
      }
      {
        modal && <Modal handleModal={handleModal} artist={artist} />
      }

      <FooterLayout />
    </>
  )
}
