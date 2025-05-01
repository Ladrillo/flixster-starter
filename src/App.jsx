import { useState, useEffect } from 'react'
import './App.css'
import data from './data/data'

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
        console.error(errorMessage)
        setMessage('')
        setError(errorMessage)
        setNowPlaying(data)
      } finally {
        setMessage(successMessage)
        setLoading(false)
        console.log(nowPlaying)
      }
    }
    fetchNowPlaying()
  }, [])
  return (
    <div className="App">
      {loading && loadingMessage}
      <div className='api-message'>{message}</div>
      <div className='api-error'>{error}</div>
    </div>
  )
}

export default App
