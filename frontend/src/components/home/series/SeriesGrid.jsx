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
    if (width >= 1600) return 13;
    if (width >= 1400) return 11;
    if (width >= 1280) return 9;
    if (width >= 1000) return 8;
    if (width >= 768) return 7; 
    if (width >= 600) return 6;
    if (width >= 400) return 4; 
    return 2;                    
  };
  return (
    <div className='justify-center items-center flex flex-col'>
    <section className='w-full mb-8'>
        <div className='text-start relative'>
        <h2 className="font-semibold text-xl uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">Populars</h2>
        <p className='text-[var(--textSecondary)] ml-2 text-lg'>Popular series for you</p>
      </div>
      <SeriesPopulars />
    </section>
          <section className='w-full mb-8 xl:max-w-[1200px]  2xl:max-w-[96vw] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px]'>
        <div className='text-start relative'>
        <h2 className="font-semibold text-xl uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">Premiere Series</h2>
        <p className='text-[var(--textSecondary)] ml-2 text-lg'>Keep in mind the upcoming premiere series</p>
      </div>
        <SeriesPremier cant={getCant()} premiere={false} />
      </section>
    <section className='w-full mb-8'>
        <div className='text-start relative'>
        <h2 className="font-semibold text-xl uppercase text-[#0ed395] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#0ed395] ml-2">TOP TEN</h2>
        <p className='text-[var(--textSecondary)] ml-2 text-lg'>Top Ten global series</p>
      </div>
      <SeriesTopTen />
      </section>

    </div>
  )
}