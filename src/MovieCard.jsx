export default function MovieCard({ movie, setCurrent }) {
    return (
        <div onClick={setCurrent}>
            <div>{movie.original_title}</div>
            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="Movie poster" />
        </div>
    )
}
