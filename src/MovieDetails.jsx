import { useRef } from 'react'

export default function MovieDetails({ movie, close }) {
    const ref = useRef(null)
    const onBackgroundcClick = evt => {
        if (evt.target === ref.current) close()
    }
    return (
        <div className='modal' ref={ref} onClick={onBackgroundcClick}>
            <div className='content'>
                <div onClick={close} className="close">&times;</div>
                <div className="info">
                    <h3>Movie Details</h3>
                    <p>Title: {movie.original_title}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <p>Popularity: {movie.popularity}</p>
                    <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="Movie poster" />
                </div>
            </div>
        </div>
    )
}
