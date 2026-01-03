import React from 'react'
import { useDetailsMovie } from '../../../hooks/movies/useDetailsMovie'

export const MovieCardDetails = ({movieId}) => {
  const {currentMovieDetails} = useDetailsMovie(movieId);
  if (!currentMovieDetails) { <span>Loading...</span> }
  return (
    <>
    <div className='max-h-full z-10 relative'>
        <div className="pt-1 flex flex-col w-full justify-between text-[0.9rem] text-gray-300   ">
          <span className='font-semibold p-0 m-0' >(
            {currentMovieDetails?.release_date ? new Date(currentMovieDetails?.release_date).getFullYear() : 'Loading...'})
                    </span>
              
          <ul className='flex items-center justify-center gap-1 '>{currentMovieDetails?.genres?.map((gen, index) => (
            index <= 3 && (<li className="bg-[var(--colorAccent)]  max-h-6 font-semibold p-[0.16rem] rounded-sm text-[#0B0F19]  max-w-full overflow-hidden"  key={gen.id}
              > {gen.name}</li>
            )
          ))}
        </ul>
       </div>
       <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-300">
          <ul className='flex items-center justify-center gap-1 font-semibold'>Languages{(currentMovieDetails?.languages?.length > 0 ? currentMovieDetails.languages : currentMovieDetails?.origin_country || ['Loading...']).map((lang) => (
                  <span className='uppercase font-semibold text-[var(--colorAccent)]' key={lang}>
              [{lang}]
            </span>
              ))
              }
        <p className='font-semibold'>Origin:</p>
            <span className='font-semibold text-[var(--colorAccent)]'>{currentMovieDetails?.origin_country?.length > 0 ? (currentMovieDetails?.origin_country?.map(orig => (<span key={orig}>{orig}</span>))) : (
                <span  className='uppercase font-semibold text-[var(--colorAccent)]'>Loading...</span>
          )
        }</span>
          </ul>
        </div>
        <div className='flex items-center justify-center  gap-2 text-sm text-gray-300'>
          <span>
          {currentMovieDetails?.runtime
            ? `${Math.floor(currentMovieDetails.runtime / 60)}h ${currentMovieDetails.runtime % 60}m`
            : 'Loading...'}

          </span>
        <p className='flex flex-col'>Status<span className="font-semibold text-[var(--colorAccent)] max-w-14 overflow-hidden">{currentMovieDetails?.status ? currentMovieDetails?.status : 'Loading...'}</span></p>
        </div>
          </div>
    </>
  )
}
