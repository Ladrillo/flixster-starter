import { useRef, useEffect } from "react";

export default function MovieDetails({ movie, close, genres }) {
  const background = useRef(null);
  const closeBtnRef = useRef(null);
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }
      if (e.key === "Escape" || e.key === "Enter") {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  const onBackgroundClick = (evt) => {
    if (evt.target === background.current) close();
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
        <div role="button" aria-label="Close dialog" onClick={close} className="close">
          &times;
        </div>
        <section className="info">
          <h3 id="movieTitleId">{movie.original_title}</h3>
          <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="Movie poster" />
          <p>
            <span>Release Date:</span> {movie.release_date}
          </p>
          <p>
            <span>Overview:</span> {movie.overview}
          </p>
          <p>
            <span>Genres:</span>{" "}
            {movie.genre_ids
              .map((i) => `${genres[i]}, `)
              .join("")
              .slice(0, -2)}
          </p>
        </section>
        <button ref={closeBtnRef} aria-label="Close dialog" onClick={close} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
}
