import MovieCard from "./MovieCard";

export default function MovieList({ movies, setCurrentMovie }) {
  return (
    <div className="movie-list">
      {movies &&
        movies.map((mov) => {
          const setCurrent = () => setCurrentMovie(mov.id);
          return <MovieCard key={mov.id} movie={mov} setCurrent={setCurrent} />;
        })}
    </div>
  );
}
