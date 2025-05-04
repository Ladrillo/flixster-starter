import { useState } from 'react'
import './App.css'
import SearchBox from './SearchBox'
import SortSelect from './SortSelect'
import MovieList from './MovieList'
import MovieDetails from './MovieDetails'
import useGenres from './hooks/useGenres'
import useSongs from './hooks/useSongs'
import { sorter } from './helpers'

const App = () => {
  const [currentMovieId, setCurrentMovieId] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const genres = useGenres()
  const { nowPlaying, message, error, loading, nextPage, } = useSongs()

  const byTitle = movie => {
    const searchTerm = search.trim().toLowerCase()
    const actualTitle = movie.original_title.toLowerCase()
    return actualTitle.includes(searchTerm)
  }

  const moviesToDisplay = nowPlaying?.results.filter(byTitle) || []
  const currentMovie = nowPlaying?.results.find(mov => mov.id === currentMovieId)

  return (
    <div className="App">
      <header>
        <h1>🎬 Flixter 🎥</h1>
        <div className='header-bottom'>
          <SearchBox search={search} setSearch={setSearch} />
          <SortSelect sort={sort} setSort={setSort} />
        </div>
      </header>
      <main>
        {false && <div className="messages">
          {loading && <div className='loading-message'>{loading}</div>}
          <div className='api-message'>{message}</div>
          <div className='api-error'>{error}</div>
        </div>}
        {moviesToDisplay.length
          ? <MovieList setCurrentMovie={setCurrentMovieId} movies={sorter(moviesToDisplay, sort)} />
          : <div>No movies here!</div>}
        <div>
          <button onClick={nextPage}>Next</button>
        </div>
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Flixter</p>
      </footer>
      {currentMovie &&
        <MovieDetails
          genres={genres}
          movie={currentMovie}
          close={() => setCurrentMovieId(null)}
        />}
    </div>
  )
}

export default App
