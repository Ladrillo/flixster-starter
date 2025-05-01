import MovieCard from './MovieCard'

export default function MovieList({ movies }) {
    return (
        <div>
            {movies && movies.map(mov => {
                return (
                    <MovieCard key={mov.id} movie={mov} />
                )
            })}
        </div>
    )
}
