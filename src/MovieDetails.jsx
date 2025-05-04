import { useRef } from 'react'

export default function MovieDetails({ movie, close, genres }) {
  const ref = useRef(null)
  const onBackgroundClick = evt => {
    if (evt.target === ref.current) close()
  }
  return (
    <div className='modal' ref={ref} onClick={onBackgroundClick}>
      <div className='content'>
        <div onClick={close} className="close">&times;</div>
        <div className="info">
          <h3>{movie.original_title}</h3>
          <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="Movie poster" />
          <p><span>Release Date:</span> {movie.release_date}</p>
          <p><span>Overview:</span> {movie.overview}</p>
          <p><span>Genres:</span> {movie.genre_ids.map(i => `${genres[i]}, `).join('').slice(0, -2)}</p>
        </div>
      </div>
    </div>
  )
}
