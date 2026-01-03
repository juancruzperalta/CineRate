import { useEffect, useState } from 'react'
import { getDetailsOfMovie } from '../../api/tmdbMovie';

export const useDetailsMovie = (movieId) => {
  const [currentMovieDetails, setCurrentMovieDetails] = useState();
 useEffect(() => {
    async function getDetails() {
    if (!movieId) return; 
      if (currentMovieDetails?.id === movieId) return;
      try {
        const detailsData = await getDetailsOfMovie(movieId);
        setCurrentMovieDetails(detailsData);
      }catch (error) {
        console.error("Error", error);
      }

    }
    getDetails();
 
 }, [movieId]);
  
  return {currentMovieDetails}
}
