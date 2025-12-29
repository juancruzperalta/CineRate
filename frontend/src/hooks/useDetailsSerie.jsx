import { useEffect, useState } from 'react'
import { getDetailsOfSerie } from '../api/tmdb';

export const useDetailsSerie = (serieId) => {
  const [currentSerieDetails, setCurrentSerieDetails] = useState();
 useEffect(() => {
    async function getDetails() {
    if (!serieId) return; 
      if (currentSerieDetails?.id === serieId) return;
      try {
        const detailsData = await getDetailsOfSerie(serieId);
        setCurrentSerieDetails(detailsData);
      }catch (error) {
        console.error("Error", error);
      }

    }
    getDetails();
 
 }, [serieId]);
  
  return {currentSerieDetails}
}
