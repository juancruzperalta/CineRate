import React from 'react'
import { PremierCards } from '../components/premiere/PremierCards.jsx'


export const Premiere = () => {
  return (
    <>
      <div className='mt-20 flex flex-col w-[1200px] md:w-[1000px] '>
        <div className='max-w-full w-full '>
          <h1 className='text-gray-300 m-2 text-3xl font-semibold'>Premiere Series</h1>
          <div className='min-w-full m-2 mb-4  border-t-1 border-gray-500'>
            <p className='w-full mt-4 text-gray-100 text-md opacity-80'>Explore upcoming series premieres and be the first to watch what’s coming next this week.</p></div>
          <PremierCards/>
        </div>
    </div>
    </>
  )
}
