import React, { useEffect, useState } from 'react'
import { getTrailerSerie } from '../../api/tmdb';

export const ShowTrailerSerie = ({ serieId }) => {

  const [trailerKey, setTrailerKey] = useState(undefined)
  useEffect(() => {
    async function fetchTrailer() {
      const key = await getTrailerSerie(serieId);

      setTrailerKey(key)
    }
    fetchTrailer()
  }, [serieId])
  return (
      <>
      {trailerKey === undefined &&(
        <div className='w-full h-full flex items-center justify-center relative'>
            <span className="text-2xl uppercase font-semibold text-gray-200 max-w-[300px] right-0">The trailer is Loading...</span>
          </div>
      )}
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
            className='w-full h-full min-h-[400px] min-w-[500px]'
          ></iframe>
        </div >)}
      {trailerKey === null && (
        <div className='w-[300px] h-full flex items-center justify-center relative'>
          <span className="text-2xl uppercase font-semibold text-gray-200 max-w-[200px] right-0">The trailer for this serie is not available</span>
        </div>)}
      </>
    )
}
