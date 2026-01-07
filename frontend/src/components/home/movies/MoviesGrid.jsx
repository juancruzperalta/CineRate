import React, { useEffect, useState } from 'react'
import { MoviesPopulars } from './MoviesPopulars'
import { MoviesPremier } from './MoviesPremier'

export const MoviesGrid = () => {
    function useScreenSize() {
      const [width, setWidth] = useState(window.innerWidth);
  
      useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      }, []);
  
      return width;
    }
    const width = useScreenSize();
  
    const getCant = () => {
    if (width >= 1600) return 13;
    if (width >= 1400) return 11;
    if (width >= 1280) return 9;
    if (width >= 1000) return 8;
    if (width >= 768) return 7; 
    if (width >= 600) return 5;
    if (width >= 400) return 3; 
      return 2;                    
    };
  return (
    <div className='justify-center items-center flex flex-col'>
    <section className='w-full mb-8'>
        <div className='text-start relative'>
        <h2 className="font-semibold 2xl:text-2xl md:text-lg lg:text-xl text-md uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">Populars Movies</h2>
        <p className='text-[var(--textSecondary)] ml-2 ml-2 2xl:text-xl md:text-md lg:text-lg text-sm'>Popular movies for you</p>
      </div>
      <MoviesPopulars />
    </section>
          <section className='w-full mb-8'>
        <div className='text-start relative'>
        <h2 className="font-semibold 2xl:text-2xl md:text-lg lg:text-xl text-md uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">Premiere Movies</h2>
        <p className='text-[var(--textSecondary)] ml-2 ml-2 2xl:text-xl md:text-md lg:text-lg text-sm'>Keep in mind the upcoming premiere movies</p>
      </div>
        <MoviesPremier cant={getCant()} premiere={false} />
      </section>

    </div>
  )
}
