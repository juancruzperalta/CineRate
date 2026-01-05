import React from 'react'
import { MoviesPopulars } from './MoviesPopulars'
import { MoviesPremier } from './MoviesPremier'

export const MoviesGrid = () => {
  return (
    <div className='justify-center items-center flex flex-col'>
    <section className='w-full mb-8'>
        <div className='text-start relative'>
        <h2 className="font-semibold text-xl uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">Populars</h2>
        <p className='text-[var(--textSecondary)] ml-2 text-lg'>Popular movies for you</p>
      </div>
      <MoviesPopulars />
    </section>
          <section className='w-full mb-8'>
        <div className='text-start relative'>
        <h2 className="font-semibold text-xl uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">Premiere Movies</h2>
        <p className='text-[var(--textSecondary)] ml-2 text-lg'>Keep in mind the upcoming premiere movies</p>
      </div>
        <MoviesPremier cant={9} premiere={false} />
      </section>
    <section className='w-full mb-8'>
        <div className='text-start relative'>
        <h2 className="font-semibold text-xl uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">TOP TEN</h2>
        <p className='text-[var(--textSecondary)] ml-2 text-lg'>Top Ten global movies</p>
      </div>
      {/* <SeriesTopTen /> */}
      </section>

    </div>
  )
}
