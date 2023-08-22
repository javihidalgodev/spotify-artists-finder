import { useEffect } from 'react'
import { useArtist } from '../../hooks/useArtist'
import './Modal.css'

export default function Modal ({ handleModal, artist }) {

  const handleCloseModal = () => {
    handleModal(false)
    document.body.style.overflow = ''
  }

  return (
    <div className="modal">
      <div className="modal-container">
        {
            <>
            <a href={artist.spotifyLink} target='_blank'><h2>{artist.name}</h2></a>
            <img src={artist.image ? artist.image.url : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"} alt="" />
            <p>Número de seguidores: {artist.followers}</p>
            <button onClick={handleCloseModal}>Cerrar</button>
            </>
        }
      </div>
    </div>
  )
}