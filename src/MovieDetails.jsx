export default function MovieDetails({ movie }) {
    console.log(movie)
    return (
        <div>
            <p>Movie Details:</p>
            <p>Title: {movie.original_title}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Popularity: {movie.popularity}</p>
            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="Movie poster" />
        </div>
    )
}