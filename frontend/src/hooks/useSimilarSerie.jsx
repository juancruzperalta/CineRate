import React, { useEffect, useState } from 'react'
import { getSimilarSerie } from '../api/tmdb';

export const useSimilarSerie = (serieId) => {
 const [similarSerie, setSimilarSerie] = useState();

  useEffect(() => {
    async function getSimilSerie() {
      const key = await getSimilarSerie(serieId);
      setSimilarSerie(key);
    }
    const timer = setTimeout(() => {
    getSimilSerie();
    }, 1000);
    return () => clearTimeout(timer);
  }, [])
  return {
    similarSerie,
  }
}
