import React, { useEffect, useRef, useState } from 'react'
import { CardDetails } from './CardDetails'
import { TrailerModal } from '../trailer/trailerModal';
import { getPopularSeries } from '../../api/tmdb';

export const SeriesPopulars = () => {
    const [DetailsID, setDetailsID] = useState(null)
  const [TrailerID, setTrailerID] = useState()
  const [series, setSerieTV] = useState([]);


  useEffect(() => {
    getPopularSeries().then(setSerieTV)
  }, [])
  function viewDetails(serieId) {
    setDetailsID(serieId);
  }
  function viewTrailer(idSerie) {
    setTrailerID(idSerie);
  }
  const serieRef = useRef(null);
  
  const scrollButton = (value) => {
    serieRef.current.scrollBy({left: value, behavior: 'smooth'})
  }

  return (
    <>
      {TrailerID && <TrailerModal trailerID={TrailerID} />}
      
    <div className='flex flex-row relative '>
      <button
          className="absolute left-0.5 top-1/2 -translate-y-1/2 z-10 bg-black/90 text-white rounded-sm p-2 hover:bg-black" 
        onClick={() => scrollButton(-1000)}> 
<svg className='w-8 h-8 fill-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>
        </button>
        <div className='flex items-start justify-start gap-4 overflow-hidden scroll-smooth py-4 xl:max-w-[1200px] 2xl:max-w-[96vw] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px]' ref={serieRef}>

      {series.map((serieId) => (
        <div key={serieId.id} className={`relative min-w-[200px] transition-all duration-500 overflow-hidden  ${
    DetailsID === null
      ? 'opacity-100'
      : serieId.id === DetailsID
        ? 'opacity-100'
        : 'opacity-35'
  }` }  onMouseEnter={() => viewDetails(serieId.id)}
      onMouseLeave={() => viewDetails(null)}>
          <img key={serieId.id} src={`https://image.tmdb.org/t/p/w500${serieId.backdrop_path}`} alt={serieId.name} className='h-[300px] object-cover rounded-lg shadow-md cursor-pointer ' />
        <div
          className="absolute bottom-0 w-full bg-[var(--bgSecondary)]/90 flex flex-col items-center transition-all duration-300  rounded-b-lg py-2 px-2 border-t-1 border-gray-300/45 shadow-md max-w-full overflow-hidden whitespace-nowrap text-ellipsis"
            style={{
              display: '-webkit-box',
    WebkitLineClamp: serieId.id === DetailsID ? 6 : 1,
    WebkitBoxOrient: 'vertical',
          maxHeight: serieId.id === DetailsID ? '300px' : '50px',
          opacity: serieId.id === DetailsID ? 1 : 0.9,
          }}
        >
          <span className="font-semibold py-1">{serieId.name}</span>

         <div
          className={`transition-all duration-500 ${
            serieId.id === DetailsID
              ? 'opacity-100 translate-y-0 mt-2'
              : 'opacity-0 -translate-y-3 h-0 overflow-hidden'
            }`}
            >
{serieId.id === DetailsID && (
  <CardDetails serieId={serieId.id} />
)}
            <button className='p-0.5 w-full bg-white text-gray-900 uppercase hover:bg-gray-300 cursor-pointer' onClick={() => viewTrailer(serieId.id)}>View Trailer</button>
          </div>


        </div>
          </div>
          ))
        }
        </div>
              <button
          className="absolute right-0.5 top-1/2 -translate-y-1/2 z-10 bg-black/90 text-white rounded-sm p-2 hover:bg-black" 
          onClick={() => scrollButton(1000)}
      >
<svg className='w-8 h-8 fill-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M149 100.8C161.9 93.8 177.7 94.5 190 102.6L448 272.1L448 128C448 110.3 462.3 96 480 96C497.7 96 512 110.3 512 128L512 512C512 529.7 497.7 544 480 544C462.3 544 448 529.7 448 512L448 367.9L190 537.5C177.7 545.6 162 546.3 149 539.3C136 532.3 128 518.7 128 504L128 136C128 121.3 136.1 107.8 149 100.8z"/></svg>
      </button>
    </div>
    </>
    )
}
