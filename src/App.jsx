import { useState } from "react";
import "./App.css";
import SearchBox from "./SearchBox";
import SortSelect from "./SortSelect";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import useGenres from "./hooks/useGenres";
import useSongs from "./hooks/useSongs";
import { sorter } from "./helpers";

export default function App() {
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const genres = useGenres();
  const { nowPlaying, message, error, loading, nextPage } = useSongs();

  const byTitle = (movie) => {
    const searchTerm = search.trim().toLowerCase();
    const actualTitle = movie.original_title.toLowerCase();
    return actualTitle.includes(searchTerm);
  };

  const moviesToDisplay = nowPlaying?.results.filter(byTitle) || [];
  const currentMovie = nowPlaying?.results.find((mov) => mov.id === currentMovieId);

  return (
    <div className="App">
      <header>
        <h1>🎬 Flixter 🎥</h1>
        <section className="header-bottom" aria-label="Search and sort controls">
          <SearchBox search={search} setSearch={setSearch} />
          <SortSelect sort={sort} setSort={setSort} />
        </section>
      </header>
      <main>
        {false && (
          <section className="messages" aria-live="polite">
            {loading && <p className="loading-message">{loading}</p>}
            <p className="api-message">{message}</p>
            <p className="api-error">{error}</p>
          </section>
        )}
        {moviesToDisplay.length ? (
          <MovieList setCurrentMovie={setCurrentMovieId} movies={sorter(moviesToDisplay, sort)} />
        ) : (
          <p role="alert">No movies here!</p>
        )}
        <div>
          <button onClick={nextPage}>Load More Movies</button>
        </div>
      </main>
      <footer>
        <p>About us: We are FLIXTER!</p>
        <p>Contact us: <a href="https://www.codepath.org/">CodePath.org</a></p>
        <p>© {new Date().getFullYear()} Flixter</p>
      </footer>
      {currentMovie && (
        <MovieDetails genres={genres} movie={currentMovie} close={() => setCurrentMovieId(null)} />
      )}
    </div>
  );
}
