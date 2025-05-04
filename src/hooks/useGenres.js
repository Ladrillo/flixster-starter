import { useState, useEffect } from 'react'

const URL = ' https://api.themoviedb.org/3/genre/movie/list?language=en'
const API_KEY = import.meta.env.VITE_API_KEY

const hardCoded = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
]

const hardCodedGenreMap = Object.fromEntries(hardCoded.map(({ id, name }) => [id, name]))

export default function useGenres() {
  const [mappings, setMappings] = useState(hardCodedGenreMap)
  useEffect(() => {
    async function getMappings() {
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
        setMappings(Object.fromEntries(parsed.genres.map(({ id, name }) => [id, name])))
      } catch (e) {
        console.warn('Problem with API, using hard-coded genre mappings')
      }
    }
    getMappings()
  }, [])
  return mappings
}
