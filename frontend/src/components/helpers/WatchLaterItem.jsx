import React from 'react'
import { useDetailsSerie } from '../../hooks/series/useDetailsSerie'
import { useNavigate } from 'react-router-dom';
import { useDetailsMovie } from '../../hooks/movies/useDetailsMovie';

export const WatchLaterSerieItem = ({ mediaId, value }) => {
  const navigate = useNavigate();
  const serieDetails = useDetailsSerie(value ? mediaId : null);
  const currentMovieDetails = useDetailsMovie(!value ? mediaId : null);
  const currentDetails = value ? serieDetails?.currentSerieDetails : currentMovieDetails?.currentMovieDetails;
  return (
    <div className='relative'>
      <img src={currentDetails?.backdrop_path ? `https://image.tmdb.org/t/p/w500${currentDetails?.backdrop_path}` : `https://image.tmdb.org/t/p/w500${currentDetails?.poster_path}`} alt={currentDetails?.name} className='h-[300px] w-[220px] object-cover rounded-md shadow-md cursor-pointer overflow-hidden' onClick={() => {
        if (value) {
          navigate(`/series/details/${currentDetails?.id}`)
        }
          else{
          navigate(`/movies/details/${currentDetails?.id}`)
        }
      }}/>
      <span className='absolute left-0 bottom-0 bg-gray-700/50 w-full'>{currentDetails?.name ? `${currentDetails?.name}` : `${currentDetails?.title}`}</span>
    </div>
  )
}
