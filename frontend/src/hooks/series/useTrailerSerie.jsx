import React, { useEffect, useState } from 'react'
import { getTrailerSerie } from '../../api/tmdbSerie';

export const useTrailerSerie = (serieId) => {
  const [trailerKey, setTrailerKey] = useState(undefined)
  useEffect(() => {
    async function fetchTrailer() {
      const key = await getTrailerSerie(serieId);

      setTrailerKey(key)
    }
    fetchTrailer()
  }, [serieId])

  return{
    trailerKey,
  }
}
