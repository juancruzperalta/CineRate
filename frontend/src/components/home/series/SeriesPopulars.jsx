import React, { useEffect, useRef, useState } from 'react'
import { SerieCardDetails } from './SerieCardDetails'
import { TrailerModalSerie } from '../../trailer/TrailerModalSerie';
import { getPopularSeries } from '../../../api/tmdbSerie';
// import { ButtonsScrollRef } from '../../helpers/ButtonsScrollRef';
import { useNavigate } from 'react-router-dom';
import { ButtonsScrollRef } from '../../helpers/ButtonsScrollRef';

export const SeriesPopulars = () => {
  const [DetailsID, setDetailsID] = useState(null);
  const [TrailerID, setTrailerID] = useState();
  const [series, setSerieTV] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const maxIndex = series.length - 1;
  const canPrev = currentSlide > 0;
  const canNext = currentSlide < maxIndex;
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });
  const leaveTimer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPopularSeries().then(setSerieTV);
  }, []);

  useEffect(() => {
    const updateMetrics = () => {
      const el = serieRef.current;
      const first = el?.querySelector('[data-index]');
      if (!el || !first) return;
      const style = getComputedStyle(el);
      const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
      const width = first.getBoundingClientRect().width;
      setItemWidth(width + gap);
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [series]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function viewDetails(serieId) {
    setDetailsID(serieId);
  }
  function viewTrailer(idSerie) {
    setTrailerID(idSerie);
  }
  const serieRef = useRef(null);


  const updateCurrentSlide = () => {
    const el = serieRef.current;
    if (!el || !itemWidth) return;
    const index = Math.round(el.scrollLeft / itemWidth);
    setCurrentSlide(index);
  };
  return (
    <>
      {TrailerID && <TrailerModalSerie trailerID={TrailerID} />}

      <div className='flex flex-row relative group'>
        <div className='flex flex-col w-full'>
          <div className='relative w-full h-2 mb-4'>
          </div>
            <div className='absolute inset-0 flex items-center justify-between px-2'>
             <ButtonsScrollRef serieRef={serieRef} reload={series} />
            </div>

          <div
            className='flex items-start justify-start gap-4 overflow-hidden scroll-smooth py-4 w-full snap-x snap-mandatory'
            ref={serieRef}
            onScroll={updateCurrentSlide}
          >
            {series.map((serieId, idx) => {
              const isActive = serieId.id === DetailsID;

              return (
                <div
                  key={serieId.id}
                  data-index={idx}
                  className={`relative min-w-[120px] md:min-w-[160px] lg:min-w-[200px] hover:scale-105 snap-start transition-all duration-500 overflow-hidden group shadow-lg hover:shadow-2xl ring-1 ring-black/30 rounded-lg ${
                    DetailsID === null
                      ? 'opacity-100'
                      : isActive
                      ? 'opacity-100'
                      : 'opacity-40'
                  }`}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      clearTimeout(leaveTimer.current);
                      viewDetails(serieId.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      leaveTimer.current = setTimeout(() => viewDetails(null), 200);
                    }
                  }}
                >
                  <img
                    key={serieId.id}
                    src={`https://image.tmdb.org/t/p/w500${serieId.backdrop_path}`}
                    alt={serieId.name}
                    className='h-[200px]  md:h-[240px] lg:h-[300px] object-cover rounded-lg cursor-pointer transition-transform duration-500 group-hover:scale-105'
                    onClick={() => navigate(`/series/details/${serieId.id}`)}
                  />
                  {isMobile && (
                    <div className='absolute bottom-0 inset-0 flex  items-end text-white'>
                    <span className='font-semibold text-center bg-black/50 w-full p-1  md:text-lg text-sm line-clamp-1'>{serieId.name}</span>
                    </div>
                  )}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t hover:scale-105 from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                      isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className='absolute inset-0'></div>
                    <div className='absolute inset-0 bg-black/80 hover:pb-4 flex flex-col md:justify-end justify-center p-3 text-white'>
                      <div className='flex flex-col gap-2 max-h-[100%] lg:max-h-[80%] overflow-y-hidden'>
                        <div className='flex flex-row items-center pb-2 justify-between border-b border-white/10'>
                          <span className='font-semibold text-start md:text-lg text-sm line-clamp-1'>{serieId.name}</span>
                          <span className='text-sm bg-yellow-500 text-black md:px-2 md:py-1 px-1 py-0 rounded'>
                            {serieId.vote_average?.toFixed(1) ?? 'N/A'}
                          </span>
                        </div>
                        <div className='flex items-center justify-start gap-2 text-xs md:text-[1rem] font-semibold text-gray-200'>
                          {serieId.first_air_date ? (
                            <span className='bg-[var(--colorAccent)] text-[#0B0F19] p-[2px] text-xs md:text-[.9rem] rounded-sm'>
                              {new Date(serieId.first_air_date).getFullYear()}
                            </span>
                          ) : null}
                          {serieId.origin_country?.[0] ? (
                            <span className='bg-[var(--colorAccent)] text-[#0B0F19] p-[2px] text-xs md:text-[.9rem] rounded-sm'>
                              {serieId.origin_country[0]}
                            </span>
                          ) : null}
                        </div>

                        <div className='text-xs md:text-[1rem] text-white/80'>
                          {isActive && <SerieCardDetails serieId={serieId.id} />}
                        </div>

                        <div className='flex flex-col lg:flex-row gap-2 mt-2'>
                          <button
                            className='flex-1 px-2 py-1  cursor-pointer text-[.8rem] md:text-[.9rem] font-semibold uppercase bg-white text-gray-900 rounded hover:bg-gray-200 transition'
                            onClick={(e) => {
                              e.stopPropagation();
                              viewTrailer(serieId.id);
                            }}
                          >
                            Trailer
                          </button>
                          <button
                            className='flex-1 px-2 py-1 cursor-pointer text-[.8rem] md:text-[.9rem] font-semibold uppercase bg-white/20 text-white rounded hover:bg-white/30 transition'
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/series/details/${serieId.id}`);
                            }}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
