import { useState, useEffect } from 'react'
import nextPage from '../data/movies'

const URL = 'https://api.themoviedb.org/3/movie/now_playing'
const API_KEY = import.meta.env.VITE_API_KEY

export default function useSongs() {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const errorMessage = 'Songs: Using hard-coded data to avoid hammering the real API'
  const loadingMessage = 'Loading your movies...'
  const successMessage = 'Movies finally loaded!'

  useEffect(() => {
    const fetchNowPlaying = async () => {
      setLoading(true)
      setMessage(loadingMessage)
      try {
        throw new Error(errorMessage)
        const response = await fetch(`${URL}?page=${pageNumber}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: 'application/json'
          }
        })
        if (!response.ok) throw new Error('ugh!')
        const parsed = await response.json()
        setNowPlaying(parsed)
      } catch (e) {
        setMessage('')
        console.warn(e.message)
        setError(e.message)
        setNowPlaying(nextPage())
      } finally {
        setMessage(successMessage)
        setLoading(false)
      }
    }
    fetchNowPlaying()
  }, [pageNumber])

  return {
    nowPlaying,
    message, error, loading,
    nextPage: () => setPageNumber(pageNumber + 1)
  }
}
