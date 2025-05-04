export default function MovieCard({ movie, setCurrent }) {
  return (
    <div
      aria-label={`View details for ${movie.original_title}`}
      className='movie-card'
      onClick={setCurrent}
      tabIndex={0}
      role="button"
    >
      <div className="pic">
        <img
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={`Poster for ${movie.original_title}`}
        />
      </div>
      <div className="info">
        <p>{movie.original_title}</p>
        <p> Rating {movie.vote_average}</p>
      </div>
    </div>
  )
}
