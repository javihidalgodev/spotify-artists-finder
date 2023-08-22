import { useArtist } from "../../hooks/useArtist"
import './ArtistsResponse.css'

function ArtistsList ({ response, handleModal, onClick }) {

  const handleOpenModal = async (id) => {
    await onClick(id)
    handleModal(true)
    document.body.style.overflow = 'hidden'
  }

  return (
    <ul>
      {
        response ? (
          response?.map(item => (
            <li key={item.id} className='item' onClick={() => {
              handleOpenModal(item.id)
            }}>
              {
                item.image
                  ? <img src={item.image.url} alt="" />
                  : <img src='https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg' alt="" />
              }
              <a href={item.spotifyLink} target='_blank'>{item.name}</a>
            </li>
          ))
        ) : <p>Cargando...</p>
      }
    </ul>
  )
}

function NoResponse () {
  return (
    <p>No se han encontrado artistas</p>
  )
}

export default function ArtistsResponse ({ artistList, handleModal, onClick, isFirstInput }) {
  const hasArtist = artistList.length > 0
  return (
    hasArtist
      ? <ArtistsList response={artistList} handleModal={handleModal} onClick={onClick} />
      : !isFirstInput.current && <NoResponse />
  )
}