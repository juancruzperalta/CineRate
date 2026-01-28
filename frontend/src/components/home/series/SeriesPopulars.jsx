import React, { useEffect, useRef, useState } from 'react'
import { SerieCardDetails } from './SerieCardDetails'
import { TrailerModalSerie } from '../../trailer/TrailerModalSerie';
import { getPopularSeries } from '../../../api/tmdbSerie';
import { ButtonsScrollRef } from '../../helpers/ButtonsScrollRef';
import { useNavigate } from 'react-router-dom';

export const SeriesPopulars = () => {
    const [DetailsID, setDetailsID] = useState(null)
  const [TrailerID, setTrailerID] = useState()
  const [series, setSerieTV] = useState([]);
let leaveTimer;
  const navigate = useNavigate();
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
  
  return (
    <>
      {TrailerID && <TrailerModalSerie trailerID={TrailerID} />}
      
    <div className='flex flex-row relative '>
        <ButtonsScrollRef serieRef={serieRef} reload={series} />
        <div className='flex items-start justify-start gap-4 overflow-hidden scroll-smooth py-4 ' ref={serieRef}>

      {series.map((serieId) => (
        <div key={serieId.id} className={`relative min-w-[120px] md:min-w-[160px] lg:min-w-[200px] transition-all duration-500 overflow-hidden  ${
    DetailsID === null
      ? 'opacity-100'
      : serieId.id === DetailsID
        ? 'opacity-100'
        : 'opacity-35'
          }`} onMouseEnter={() => { clearTimeout(leaveTimer), viewDetails(serieId.id) }}
      onMouseLeave={() => {
  leaveTimer = setTimeout(() => viewDetails(null), 200);
}}>
          <img key={serieId.id} src={`https://image.tmdb.org/t/p/w500${serieId.backdrop_path}`} alt={serieId.name} className='h-[200px] md:h-[240px] lg:h-[300px] object-cover rounded-lg shadow-md cursor-pointer ' onClick={() => navigate(`/series/details/${serieId.id}`)} />
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
  <SerieCardDetails serieId={serieId.id} />
)}
            <button className='p-0.5 w-full bg-white text-gray-900 uppercase hover:bg-gray-300 cursor-pointer' onClick={() => viewTrailer(serieId.id)}>View Trailer</button>
          </div>


        </div>
          </div>
          ))
        }
        </div>
    </div>
    </>
    )
}
