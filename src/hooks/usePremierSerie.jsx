import { useEffect, useState } from 'react'
import { getPremiereSer } from '../api/tmdb';

export const usePremierSerie = () => {
  const [premiereSeries, setPremiereSeries] = useState(null)
  useEffect(() => {
    async function getPremiereSeries() {
      const key = await getPremiereSer();
      setPremiereSeries(key);
    }
    getPremiereSeries();
  }, [])
  
  return {premiereSeries}
}
