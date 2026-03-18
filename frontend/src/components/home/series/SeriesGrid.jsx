'use client'
import { useEffect, useState } from 'react';
import { SeriesPopulars } from './SeriesPopulars.jsx'
import { SeriesPremier } from './SeriesPremier.jsx';
import { SeriesTopTen } from './SeriesTopTen.jsx';

export default function SeriesGrid() {
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
    if (width >= 1600) return 8;
    if (width >= 1400) return 4;
    if (width >= 1280) return 4;
    if (width >= 1000) return 3;
    if (width >= 768) return 3; 
    if (width >= 600) return 2;
    if (width >= 400) return 1; 
    return 1;                    
  };
  return (
    <div className='justify-center items-center flex flex-col'>
    <section className='w-full mb-8'>
      <div className='glass-card'>
        <div className='text-start relative'>
          <h2 className="font-semibold 2xl:text-2xl md:text-lg lg:text-xl text-md uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">Populars</h2>
          <p className='text-[var(--textSecondary)] ml-2 2xl:text-xl md:text-md lg:text-lg text-sm'>Popular series for you</p>
        </div>
        <div className='mt-4'>
          <SeriesPopulars />
        </div>
      </div>
    </section>
    <section className='w-full mb-8'>
      <div className='glass-card'>
        <div className='text-start relative'>
          <h2 className="font-semibold 2xl:text-2xl md:text-lg lg:text-xl text-md uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">Premiere Series</h2>
          <p className='text-[var(--textSecondary)] ml-2 2xl:text-xl md:text-md lg:text-lg text-sm'>Keep in mind the upcoming premiere series</p>
        </div>
        <div className='mt-4'>
          <SeriesPremier cant={getCant()} premiere={false} />
        </div>
      </div>
    </section>
    <section className='w-full mb-8'>
      <div className='glass-card'>
        <div className='text-start relative'>
          <h2 className="font-semibold 2xl:text-2xl md:text-lg lg:text-xl text-md uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">TOP TEN</h2>
          <p className='text-[var(--textSecondary)] ml-2 2xl:text-xl md:text-md lg:text-lg text-sm'>Top Ten global series</p>
        </div>
        <div className='mt-4'>
          <SeriesTopTen />
        </div>
      </div>
    </section>

    </div>
  )
}