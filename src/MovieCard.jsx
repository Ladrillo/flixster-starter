import { useRef, useEffect } from 'react'

export default function MovieCard({ movie, setCurrent }) {
  const cardRef = useRef(null)
  useEffect(() => {
    const onEnter = (e) => {
      if (e.key === "Enter" && document.activeElement === cardRef.current) {
        e.preventDefault();
        setCurrent();
      }
    }
    document.addEventListener("keydown", onEnter);
    return () => {
      document.removeEventListener("keydown", onEnter);
    };
  }, [])

  return (
    <div
      aria-label={`View details for ${movie.original_title}`}
      className="movie-card"
      onClick={setCurrent}
      tabIndex={0}
      role="button"
      ref={cardRef}
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
  );
}
