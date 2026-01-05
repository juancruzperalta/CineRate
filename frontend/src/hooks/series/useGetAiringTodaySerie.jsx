import React, { useEffect, useState } from 'react'
import { getAiringTodaySerie } from '../../api/tmdbSerie';

export const useGetAiringTodaySerie = () => {
  const [currentSerie, setCurrentSerie] = useState();

  useEffect(() => {
    async function getAiringToday() {
      const key = await getAiringTodaySerie();
      setCurrentSerie(key);
    }
    const timer = setTimeout(() => {
    getAiringToday();
    }, 1000);
    return () => clearTimeout(timer);
  }, [])
  return {
    currentSerie
  }
}
