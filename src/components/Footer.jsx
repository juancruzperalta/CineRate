import React from 'react'
export const Footer = () => {
  return (
    <footer className="text-center text-gray-300 bg-[var(--bgSecondary)]  w-full max-w-[100vw] overflow-hidden h-[200px] flex flex-col items-center justify-end  relative">
      <div className='grid grid-cols-1 gap-2 items-center justify-center  w-full z-10'>
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
        </div>
      </div>
      <div className='flex items-center justify-center m-2 gap-2'>
      <img className='w-12 h-12 rounded-full object-cover' src="../../src/assets/icons/logo.png" alt="" />
      <span className=' text-gray-500'>©CineRate 2025</span>
      </div>
    </footer>
  )
}
