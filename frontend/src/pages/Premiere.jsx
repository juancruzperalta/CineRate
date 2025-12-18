import React from 'react'
import { PremierCards } from '../components/premiere/PremierCards.jsx'


export const Premiere = () => {
  return (
    <>
      <div className='mt-24 flex flex-col 2xl:max-w-[96vw] xl:max-w-[1200px] lg:max-w-[1000px]
    md:max-w-[700px] sm:max-w-[600px] max-w-[400px] w-full'>
        <div className='max-w-full w-full '>
          <h1 className=' text-white
  text-4xl
  font-semibold
  tracking-tight
  mb-3'>Premiere Series</h1>
<div className="
  pt-4
  mb-10
">
            <p className='    text-gray-300
    text-lg
    leading-relaxed'>Explore upcoming series premieres and be the first to watch what’s coming next this week.</p>

          </div>
<p className="mt-2 text-[0.9rem]  uppercase tracking-widest text-white/35">
  This week premieres
</p>
         <div className="mx-auto mt-2 mb-2 h-px w-28 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <PremierCards/>
        </div>
    </div>
    </>
  )
}
