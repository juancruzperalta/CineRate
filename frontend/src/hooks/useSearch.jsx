import React, { useEffect, useState } from 'react'
import { getSearchMovieOrSerie } from '../api/tmdb';

export const useSearch = (query) => {
  const [QuerySearch, setQuerySearch] = useState();
 useEffect(() => {
    async function getDetails() {
    if (!query) return; 
      try {
        const detailsData = await getSearchMovieOrSerie(query);
        setQuerySearch(detailsData);
      }catch (error) {
        console.error("Error:", error);
      }

    }
    getDetails();
 
 }, [query]);
  
  return {QuerySearch}
}