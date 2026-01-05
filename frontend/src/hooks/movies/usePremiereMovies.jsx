import { useEffect, useState } from 'react'
import { getPremiereMovie } from '../../api/tmdbMovie';

export const usePremiereMovies = () => {
  const [premiereMovies, setPremiereMovies] = useState(null)
  useEffect(() => {
    async function getPremiereMovies() {
      const key = await getPremiereMovie();
      setPremiereMovies(key);
    }
    getPremiereMovies();
  }, [])
  
  return {premiereMovies}
}
