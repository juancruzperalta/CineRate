import React, { useEffect, useRef, useState } from 'react'
import { topTenSeries } from '../../api/tmdb';

export const SeriesTopTen = () => {
  const [topSerie, setTopSerie] = useState([])
  const [serieAct, setSerieAct] = useState(0)
  useEffect(() => {
    async function topSeries() {
      const top = await topTenSeries();
      setTopSerie(top);
    }

    topSeries();
  }, [])
  
  const serieRef = useRef();

  const scrollButton = (value) => {
    serieRef.current.scrollBy({ left: value, behavior: 'smooth' })
  }
  
  return (
    <>
      <div className="flex overflow-hidden mt-4 mb-4 h-[580px]">
    <div className="w-[30%] flex flex-col max-h-full">
          {topSerie.slice(0, 10).map((serie, i) => (
    <div key={serie.id} className='flex flex-col justify-center relative mr-4 max-h-[580px]'>
    <div key={i} className='flex items-center mb-1 h-[54px] bg-[var(--bgSecondary)]/90 border border-gray-700 rounded-lg p-[2.2px] shadow-md hover:bg-[var(--bgSecondary)] transition-all duration-300 '  style={{
  backgroundImage: `url(https://image.tmdb.org/t/p/w500${serie.backdrop_path})`,
backgroundSize: "cover",
backgroundRepeat: "no-repeat",
backgroundPosition: "center",
      opacity: i === serieAct ? 0.80 : 0.15
  }}>
    </div>
      <span className={`absolute z-10 text-sm font-semibold px-2 ${i=== serieAct ? 'opacity-100' : 'opacity-60'}`}>
                <span className="text-yellow-300" >#{i + 1}</span> {serie.name} 
      </span>
    </div>
  ))}
        </div>
        <div className='w-[70%] relative h-full max-h-[580px]'>
      <div className='flex gap-4 overflow-hidden scroll-smooth h-full w-full' ref={serieRef}>
    <button
              className="absolute left-0.5 top-1/2 -translate-y-1/2 z-10 bg-black/90 text-white rounded-sm p-2 hover:bg-black" 
              onClick={() => { scrollButton(-serieRef.current.querySelector('img').clientWidth - 16); setSerieAct(prev => Math.max(prev - 1, 0)); }}> 
    <svg className='w-8 h-8 fill-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>
            </button>
        {topSerie.slice(0, 10).map((serie,i) => (
        <div id={serie.id} className='relative flex-shrink-0 transition-all duration-500 w-full h-full rounded-md bg-gradient-to-t from-black/80 via-black/30 to-transparent'>
            <img key={serie.id} src={`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`} alt={serie.name} className='w-full max-w-full h-[580px] object-cover  opacity-65 rounded-md' />
            <span className='text-yellow-300 absolute left-0 top-0 right-0 m-auto text-2xl font-bold'>#{i+1}</span>
          <span className='absolute bottom-0 m-auto left-0 right-0 p-2 bg-gray-800/80'>
        <div className='flex items-center justify-center relative'>
          <h3 className='text-4xl font-bold uppercase text-white leading-tight'>
            {serie?.name}</h3>
            <span className='font-semibold text-black bg-yellow-500 text-[1rem] rounded-sm absolute right-1'>{serie?.vote_average?.toFixed(1) ? <span className='border-1 border-gray-300 bg-yellow-500  p-[0.2rem] m-0 pt-0 pb-0 rounded-sm'>{serie?.vote_average?.toFixed(1) }</span> :  (
                 <span className='bg-yellow-300/70 rounded w-[36px] h-[1rem] inline-block animate-pulse'></span>
                )}
                  </span>
            </div>
          <p className=' text-[1rem] text-gray-200  line-clamp-7 '>{serie?.overview ? serie?.overview  :
            <span className='bg-gray-500/20 rounded p-1 inline-block animate-pulse'>Loading...</span>}</p>
              <div className='flex gap-2 items-center justify-center mt-1'>

                 <span className='font-semibold text-gray-200/95 text-[1rem]  p-0 m-0 pt-0 pb-0 rounded-sm'>{serie?.first_air_date ? <span className='border-1 border-gray-300  p-[0.2rem] m-0 pt-0 pb-0 rounded-sm'>{new Date(serie?.first_air_date).getFullYear()}</span> :  (
                   <span className='bg-gray-500/20 rounded w-[30px] h-[1rem] inline-block animate-pulse'></span>
    )}</span>
            <span className='font-semibold text-gray-200/95 text-[1rem] p-0 m-0 pt-0 pb-0 rounded-sm'><span className='border-1 border-gray-300   p-[0.2rem] m-0 pt-0 pb-0 rounded-sm'>{serie?.origin_country?.[0]}</span>
          </span>
                   </div>

                      <div className='gap-4 flex flex-row items-center justify-center mt-2'>
            <button className='p-2 bg-white text-gray-900 uppercase hover:bg-gray-300 cursor-pointer'>View Trailer</button>
          </div>
            </span>
          </div>
    ))}
        <button
                className="absolute right-0.5 top-1/2 -translate-y-1/2 z-10 bg-black/90 text-white rounded-sm p-2 hover:bg-black" 
              onClick={() => { scrollButton(serieRef.current.querySelector('img').clientWidth + 16); setSerieAct(prev => Math.min(prev + 1, 9)); }
              }
            >
      <svg className='w-8 h-8 fill-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M149 100.8C161.9 93.8 177.7 94.5 190 102.6L448 272.1L448 128C448 110.3 462.3 96 480 96C497.7 96 512 110.3 512 128L512 512C512 529.7 497.7 544 480 544C462.3 544 448 529.7 448 512L448 367.9L190 537.5C177.7 545.6 162 546.3 149 539.3C136 532.3 128 518.7 128 504L128 136C128 121.3 136.1 107.8 149 100.8z"/></svg>
            </button>
        </div>
        </div>
        </div>
    </>
  )
}
