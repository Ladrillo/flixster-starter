import { useState, useEffect } from 'react'
import MovieList from './MovieList'
import './App.css'
import hardcodeDdata from './data/data'

const URL = 'https://api.themoviedb.org/3/movie/now_playing'
const API_KEY = import.meta.env.VITE_API_KEY

const App = () => {
  const [nowPlaying, setNowPlaying] = useState({})
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const errorMessage = 'Problem with API, using hard-coded data'
  const loadingMessage = 'Loading your movies...'
  const successMessage = 'Movies finally loaded!'

  useEffect(() => {
    const fetchNowPlaying = async () => {
      setLoading(true)
      setMessage(loadingMessage)
      try {
        throw new Error('Avoiding hammering the real API')
        const response = await fetch(URL, {
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
        setNowPlaying(hardcodeDdata)
      } finally {
        setMessage(successMessage)
        setLoading(false)
      }
    }
    fetchNowPlaying()
  }, [])
  return (
    <div className="App">
      {loading && loadingMessage}
      <div className='api-message'>{message}</div>
      <div className='api-error'>{error}</div>
      <MovieList movies={nowPlaying.results} />
    </div>
  )
}

export default App
