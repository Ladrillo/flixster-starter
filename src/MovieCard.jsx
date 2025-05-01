export default function MovieCard({ movie, setCurrent }) {
    return (
        <div className='movie-card' onClick={setCurrent}>
            <div className="pic">
                <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="Movie poster" />
            </div>
            <div className="info">
                <p>{movie.original_title}</p>
                <p> Rating {movie.vote_average}</p>
            </div>
        </div>
    )
}
