import { useEffect, useState } from 'react'
import { getSimilarOfMovie } from '../../api/tmdbMovie';

export const useSimilarMovie = (movieId) => {
  const [similarMovie, setuseSimilarMovie] = useState();
 useEffect(() => {
    async function getSimilar() {
    if (!movieId) return; 
      if (similarMovie?.id === movieId) return;
      try {
        const detailsData = await getSimilarOfMovie(movieId);
        setuseSimilarMovie(detailsData);
      }catch (error) {
        console.error("Error:", error);
      }

    }
    getSimilar();
 
 }, [movieId]);
  
  return {similarMovie}
}
