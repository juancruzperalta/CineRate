import { useEffect, useState } from 'react'
import { getCreditsSerie } from '../../api/tmdbSerie';

export const useCreditsSerie = (serieId) => {
  const [useCreditsSerie, setUseCreditsSerie] = useState();
 useEffect(() => {
    async function getDetails() {
    if (!serieId) return; 
      if (useCreditsSerie?.id === serieId) return;
      try {
        const detailsData = await getCreditsSerie(serieId);
        setUseCreditsSerie(detailsData);
      }catch (error) {
        console.error("Error:", error);
      }

    }
    getDetails();
 
 }, [serieId]);
  
  return {useCreditsSerie}
}
