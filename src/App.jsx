import { useState, useEffect } from 'react'
import MovieList from './MovieList'
import './App.css'
import nextPage from './data/movies'
import SearchBox from './SearchBox'
import SortSelect from './SortSelect'
import { sorter } from './helpers'

const URL = 'https://api.themoviedb.org/3/movie/now_playing'
const API_KEY = import.meta.env.VITE_API_KEY

const App = () => {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(5)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const errorMessage = 'Problem with API, using hard-coded data'
  const loadingMessage = 'Loading your movies...'
  const successMessage = 'Movies finally loaded!'

  useEffect(() => {
    const fetchNowPlaying = async () => {
      setLoading(true)
      setMessage(loadingMessage)
      try {
        throw new Error('Avoiding hammering the real API')
        const response = await fetch(`${URL}?page=${pageNumber}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: 'application/json'
          }
        })
        if (response.status != 200) throw new Error('ugh!')
        const parsed = await response.json()
        setNowPlaying(parsed)
      } catch (e) {
        setMessage('')
        console.error(errorMessage)
        setError(errorMessage)
        setNowPlaying(nextPage())
      } finally {
        setMessage(successMessage)
        setLoading(false)
      }
    }
    fetchNowPlaying()
  }, [pageNumber])

  function byTitle(movie) {
    const searchTerm = search.trim().toLowerCase()
    const actualTitle = movie.original_title.toLowerCase()
    return actualTitle.includes(searchTerm)
  }

  const moviesToDisplay = nowPlaying?.results.filter(byTitle) || []

  return (
    <div className="App">
      <SearchBox search={search} setSearch={setSearch} />
      <SortSelect sort={sort} setSort={setSort} />
      {loading && loadingMessage}
      <div className='api-message'>{message}</div>
      <div className='api-error'>{error}</div>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
      {moviesToDisplay.length
        ? <MovieList movies={sorter(moviesToDisplay, sort)} />
        : <div>No movies here!</div>}
    </div>
  )
}

export default App
