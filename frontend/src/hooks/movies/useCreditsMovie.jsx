import { useEffect, useState } from 'react'
import { getCreditsOfMovie } from '../../api/tmdbMovie';

export const useCreditsMovie = (movieId) => {
  const [creditsMovie, setuseCreditsMovie] = useState();
 useEffect(() => {
    async function getCredits() {
    if (!movieId) return; 
      if (creditsMovie?.id === movieId) return;
      try {
        const detailsData = await getCreditsOfMovie(movieId);
        setuseCreditsMovie(detailsData);
      }catch (error) {
        console.error("Error:", error);
      }

    }
    getCredits();
 
 }, [movieId]);
  
  return {creditsMovie}
}
