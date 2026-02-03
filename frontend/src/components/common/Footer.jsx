import React from 'react'
import { Link } from './Link'
export const Footer = () => {
  return (
    <footer className="text-center text-gray-300 bg-[var(--bgSecondary)]  w-full max-w-[100vw] overflow-hidden h-full md:h-[200px] pt-4 flex flex-col items-center justify-end  relative">
      <div className='text-sm md:text-md grid grid-cols-1 gap-2 items-center justify-center  w-full z-10'>
        <div className='flex gap-2 justify-center  items-center'>
          <span  className='pr-2 border-r-2 border-gray-500 hover:text-gray-400'>Instagram</span>
          <span  className='pr-2 border-r-2 border-gray-500 hover:text-gray-400'>TikTok</span>
          <span className='hover:text-gray-400'>GitHub</span>
        </div>
        <div className='flex  gap-2 justify-center  items-center'>
          <span className='pr-2 border-r-2 border-gray-500 hover:text-gray-400'>About we</span>
          <span className='pr-2 border-r-2 border-gray-500 hover:text-gray-400'>Help</span>
          <span className='pr-2 border-r-2 border-gray-500 hover:text-gray-400'>Conditions and Terms</span>
          <span className='hover:text-gray-400'>Privacy Policy</span>
        </div>
        <div className='flex flex-col items-center justify-center'>
        <p className='text-gray-500 bg-gray-900 inline-block px-2'>"The information is provider for a external sources. All rights belong for respective properties”</p>
        <p className='text-gray-500 bg-gray-900 inline-block px-2'>
            This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"> 
          <img className='w-32' src="/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="" />
            </a>
        </div>
      </div>
      <div className='flex items-center justify-center m-2 gap-2'>
      <img className='w-12 h-12 rounded-full object-cover'         src="/1fb4eb9d-c23b-4dcb-9818-c037389947c8.png" alt="Cine Rate" />
      <span className=' text-gray-500'>©CineRate 2025</span>
      </div>
    </footer>
  )
}
