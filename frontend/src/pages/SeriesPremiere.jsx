import React, { useEffect, useState } from 'react'
import { SeriesMoviesCards } from '../components/SerieMovieDetails/SeriesMoviesCards.jsx'
import { usePremierSerie } from '../hooks/usePremierSerie.jsx';
import {  useNavigate, useSearchParams } from 'react-router-dom';
const IMAGES_PER_PAGE = 10;

export const SeriesPremiere = () => {
    const [pageAct, setPageAct] = useSearchParams();
    const pageFromUrl = Number(pageAct.get("pageAct")) || 1;
    const [page, setPage] = useState(pageFromUrl);
    const start = (page - 1) * IMAGES_PER_PAGE;
    const end = start + IMAGES_PER_PAGE;
    const { premiereSeries } = usePremierSerie();
    const series = premiereSeries || [];
    const imagesToShow = series.slice(start, end);
    const [isPage, setIsPage] = useState(pageFromUrl);
    const navigate = useNavigate();  
    const ultPage= series.length/IMAGES_PER_PAGE;
      useEffect(() => {
        setPageAct({ pageAct: isPage });
      }, [page])
      useEffect(() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          setPageAct({ pageAct: pageFromUrl });
          }, [pageFromUrl])
      useEffect(() => {
      if (ultPage > 0 && isPage < 1 || ultPage > 0 && isPage > ultPage) {
        navigate("/404", { replace: true });
      }
    }, [isPage, ultPage, navigate]);
  return (
    <>
      <div className='mt-24 flex flex-col 2xl:max-w-[96vw] xl:max-w-[1200px] lg:max-w-[1000px]
    md:max-w-[700px] sm:max-w-[600px] max-w-[400px] w-full overflow-hidden'>
        <div className='max-w-full w-full overflow-hidden'>
          <h1 className=' text-white text-4xl font-semibold tracking-tight mb-3'>Premiere Series</h1>
          <div className="  pt-4  mb-10">
            <p className='    text-gray-200 text-lg leading-relaxed'>Explore upcoming series premieres and be the first to watch what’s coming next this week.</p>
          </div>
          <p className="mt-2 text-[0.9rem]  uppercase tracking-widest text-white/55">
            This week premieres
          </p>
            <div className="mx-auto mt-2 mb-2 h-px w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
             <SeriesMoviesCards seriesOrMovie={imagesToShow} />
            </div>
              <div className='flex gap-2 items-center justify-center w-full mt-8 mb-4'>
              {Array.from({ length: series.length/IMAGES_PER_PAGE }, (_,i) => i + 1).map((num) => (
                <button className={`cursor-pointer rounded-full flex items-center justify-center p-1 w-8 h-8 border-1 border-gray-800  ${(isPage === num || isPage === 0 && isPage+1 === num) ? 'bg-white text-black' : 'bg-transparent'}`} key={num} onClick={(() => {
                  setPage(num); setIsPage(num);
                }
                )}>
                  {num}
                </button>
              ))}
        </div>
    </div>
    </>
  )
}
