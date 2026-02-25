import React, { useEffect, useState } from 'react'
import { getTrailerSerie } from '../../api/tmdbSerie';
import { Skeleton } from '../helpers/Skeleton';
import { useTrailerSerie } from '../../hooks/series/useTrailerSerie';

export const ShowTrailerSerie = ({ serieId}) => {

  const {trailerKey} = useTrailerSerie(serieId);

  if(trailerKey === undefined){
            return<>
      <div className='w-full h-full flex items-center justify-center relative'>
        <span className="text-2xl uppercase font-semibold text-gray-200 max-w-[260px] right-0">The trailer is Loading...</span>
      </div>
      </>
}
      if(trailerKey === null){
        return<>
        <div className='h-full flex-col flex items-center justify-center relative'>
          <Skeleton w={300} h={200} error={true}/>
          <span className="text-2xl uppercase font-semibold text-gray-200 max-w-[200px] right-0">The trailer for this serie is not available</span>
        </div>
        </>
        }
  return (
      <>
      {trailerKey&&(
        <div className='w-full h-full flex items-center justify-center relative' >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            id="iframeVideo"
            allowFullScreen
            className='w-full h-full min-h-[200px] min-w-[300px] md:min-h-[400px] md:min-w-[500px]'
          ></iframe>
        </div >)}
      </>
    )
}
