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
          <span className='pr-2 border-r-2 border-gray-500 hover:text-gray-400'>Sobre nosotros</span>
          <span className='pr-2 border-r-2 border-gray-500 hover:text-gray-400'>Ayuda</span>
          <span className='pr-2 border-r-2 border-gray-500 hover:text-gray-400'>Términos y Condiciones</span>
          <span className='hover:text-gray-400'>Política de Privacidad</span>
        </div>
        <div className='flex flex-col items-center justify-center'>
        <p className='text-gray-500 bg-gray-900 inline-block px-2'>“La información proviene de fuentes externas. Todos los derechos pertenecen a sus respectivos propietarios.”</p>
        <p className='text-gray-500 bg-gray-900 inline-block px-2'>
          This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </div>
      <span className='p-0 m-2 text-gray-500'>©CineRate 2025</span>
    </footer>
  )
}
