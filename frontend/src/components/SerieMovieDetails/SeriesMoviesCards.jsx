
import React, { useEffect, useState } from 'react';
import { UserButtons } from '../UserButtons';
import { SeriesOrMovieDetails } from './SeriesOrMovieDetails';
export const SeriesMoviesCards = ({seriesOrMovie}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (seriesOrMovie && seriesOrMovie.length > 0) {
      setIsLoading(false);
    }
  }, [seriesOrMovie]);
  return (
    <div className='flex items-center justify-center gap-8 flex-col w-full h-full'>
      {
        isLoading ? (
        <div className='w-full max-w-screen-xl flex flex-col gap-8 px-4'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='w-full grid grid-cols-1 lg:grid-cols-[1fr_.8fr_.2fr] gap-6 items-center justify-center bg-gray-200/5 overflow-hidden border-b-2 border-gray-800/50 p-4 rounded-md'>
              <div className='flex flex-col gap-4'>
                <div className='w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] rounded-md bg-gray-800 animate-pulse shadow-[0_10px_10px_rgba(0,0,0,0.7)]'></div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='h-6 w-48 bg-gray-700 rounded animate-pulse'></div>
                <div className='h-4 w-64 bg-gray-700 rounded animate-pulse'></div>
                <div className='h-4 w-56 bg-gray-700 rounded animate-pulse'></div>
                <div className='flex gap-4 mt-2'>
                  <div className='h-4 w-24 bg-gray-700 rounded animate-pulse'></div>
                  <div className='h-4 w-24 bg-gray-700 rounded animate-pulse'></div>
                </div>
              </div>
                 <div className='flex gap-4 mt-2 items-center justify-center'>
                 <div className='h-16 w-16 bg-gray-700 rounded-full animate-pulse'></div>
                </div>
            </div>
          ))}
       </div>
        ) :(
    seriesOrMovie?.map((serie) => {
      const isSerie =
        serie?.media_type === "tv" ||
        (!serie?.media_type && !!serie?.name);

      return serie.backdrop_path ? (
        <div
          key={serie.id}
          className={`w-full p-3 max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-8 mt-0 items-start justify-center bg-gray-200/5 overflow-hidden ${
            serie.backdrop_path || serie.poster_path
              ? "border-b-2 border-gray-800/50 p"
              : "border-b-0 p-0"
          }`}
        >
          <div className='flex flex-col relative gap-4'>
            <div className='relative w-full max-w-full h-[240px] sm:h-[320px] md:h-[360px] lg:h-[400px] backdrop-blur-md rounded-md shadow-[0_10px_10px_rgba(0,0,0,0.7)] transition-all overflow-hidden'>
              <h2 className='absolute top-0 left-0 right-0 z-10 bg-black/70 px-3 py-1 text-base sm:text-lg'>
                {serie.name}
              </h2>

              <img
                src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`}
                alt={serie.name}
                className='w-full h-full object-cover rounded-md shadow-md cursor-pointer overflow-hidden'
              />
            </div>

            <div className='flex absolute w-full bottom-0 gap-4 mt-4 lg:mt-0'>
              <UserButtons
                serieId={serie.id}
                mediaType={isSerie}
              />
            </div>
          </div>

          {(serie.backdrop_path || serie.poster_path) && (
            <div className='w-full lg:ml-2 relative max-w-full h-full overflow-hidden'>
              <SeriesOrMovieDetails
                serieId={serie.id}
                serie={isSerie}
              />
            </div>
          )}
        </div>
      ) : null;
    })
  )
}
</div>
)}
