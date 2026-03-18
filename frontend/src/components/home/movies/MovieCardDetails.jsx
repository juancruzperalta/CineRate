import React from 'react'
import { useDetailsMovie } from '../../../hooks/movies/useDetailsMovie'

export const MovieCardDetails = ({movieId}) => {
  const {currentMovieDetails} = useDetailsMovie(movieId);
  if (!currentMovieDetails) { <span>Loading...</span> }
  return (
    <>
    <div className='max-h-full z-10 relative 2xl:text-[1rem] md:text-[0.8rem] lg:text-[0.9rem] text-[0.7rem]'>
        <div className="pt-1 flex flex-col w-full justify-between text-gray-300   ">
              
          <ul className='flex items-center justify-start gap-1 '>{currentMovieDetails?.genres?.map((gen, index) => (
            index <= 3 && (<li className="text-ellipsis truncate px-2 py-0.5 rounded bg-[var(--colorAccent)] text-[#0B0F19]"  key={gen.id}
              > {gen.name}</li>
            )
          ))}
        </ul>
       </div>
        <div className='flex items-center justify-center lg:justify-start  gap-2 text-gray-300'>
          <p className='flex flex-col'>Duration<span className="font-semibold text-[var(--colorAccent)] max-w-14 overflow-hidden">
            {currentMovieDetails?.runtime
                      ? `${Math.floor(currentMovieDetails.runtime / 60)}h ${currentMovieDetails.runtime % 60}m`
                      : 'Loading...'}</span></p>
                  <p className='flex flex-col '>Status<span className="font-semibold text-[var(--colorAccent)] max-w-14 overflow-hidden text-ellipsis truncate">{currentMovieDetails?.status ? currentMovieDetails?.status : 'Loading...'}</span></p>
         </div>
        </div>
    </>
  )
}
