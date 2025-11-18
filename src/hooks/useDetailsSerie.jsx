import { useEffect, useState } from 'react'
import { getDetailsOfSerie } from '../api/tmdb';

export const useDetailsSerie = (serieId) => {
  const [currentSerieDetails, setCurrentSerieDetails] = useState();
 useEffect(() => {
    async function getDetails() {
          if (!serieId || currentSerieDetails?.id === serieId) return;

      if (serieId) {
        const detailsData = await getDetailsOfSerie(serieId);
        setCurrentSerieDetails(detailsData);
      }
    }

    getDetails();
 }, [serieId]);
  
  return {currentSerieDetails}
}
