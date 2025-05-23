import { useRef, useEffect } from "react";

export default function MovieDetails({ movie, close, genres }) {
  const background = useRef(null);
  const closeBtnRef = useRef(null);
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Tab") e.preventDefault();
      if (e.key === "Escape" || e.key === "Enter") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  const onBackgroundClick = (evt) => {
    if (evt.target === background.current) close(); // don't steal focus from the card!
  };
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="movieTitleId"
      className="modal"
      ref={background}
      onClick={onBackgroundClick}
    >
      <div className="content">
        <div
          role="button"
          aria-label="Close dialog"
          onClick={close}
          onMouseDown={(e) => e.preventDefault()}
          className="close"
        >
          &times;
        </div>
        <section className="info">
          <h3 id="movieTitleId">{movie.original_title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={`Movie poster for ${movie.original_title}`}
          />
          <p><span>Release Date:</span> {movie.release_date}</p>
          <p><span>Runtime:</span> {Math.floor(Math.random() * 66) + 85} minutes</p>
          <p><span>Overview:</span> {movie.overview}</p>
          <p>
            <span>Genres:</span>{" "}
            {movie.genre_ids
              .map((i) => `${genres[i]}, `)
              .join("")
              .slice(0, -2)}
          </p>
        </section>
        <button
          ref={closeBtnRef}
          aria-label="Close dialog"
          onMouseDown={(e) => e.preventDefault()} // don't steal focus from the card!
          onClick={close}
          className="close-btn"
        >
          Close
        </button>
      </div>
    </div>
  );
}
