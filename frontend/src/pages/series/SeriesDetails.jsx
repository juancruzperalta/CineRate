import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
  import { useDetailsSerie } from '../../hooks/series/useDetailsSerie';
import { ShowTrailerSerie } from '../../components/trailer/ShowTrailerSerie';
import { useCreditsSerie } from '../../hooks/series/useCreditsSerie';
import { Skeleton } from '../../components/helpers/Skeleton';
import { ButtonsScrollRef } from '../../components/helpers/ButtonsScrollRef';
import { useSimilarSerie } from '../../hooks/series/useSimilarSerie';

export const SeriesDetails = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false)
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const { currentSerieDetails } = useDetailsSerie(id);
  const similarSerie = useSimilarSerie(id);
  const creditsSerie = useCreditsSerie(id);
  const serieRef = useRef(null);
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
     const visible = isVisible ? similarSerie?.similarSerie?.results : 
       similarSerie?.similarSerie?.results?.slice(0, getCant());
  useEffect(() => {
  const timeout = setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 1000);
    setIsVisible(false);
  
  return () => clearTimeout(timeout);
  }, [id]);
  useEffect(() => {
    if (currentSerieDetails) { 
      setIsLoading(false);
    }
  }, [currentSerieDetails])

    if (isLoading) {
      return (
        <>
          <div className="flex flex-col mb-4 h-full w-full px-10 min-h-screen overflow-hidden text-[var(--textPrimary)]">
            <div className='mt-24 w-full h-[40px] rounded-2xl bg-gray-700 animate-pulse p-1' />

            <div className='w-full h-[400px] min-h-[400px] flex flex-col md:grid md:grid-cols-2 overflow-hidden mt-4 items-center justify-center gap-6 relative rounded-2xl bg-[rgba(255,255,255,0.04)]'>
              <div className="h-full w-full bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-full w-full bg-gray-700 rounded animate-pulse mb-2"></div>
            </div>

            <div className='flex gap-2 mt-2'>
              <div className="h-8 w-30 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-30 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-26 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-22 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-12 bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="mt-6 h-4 p-1 md:w-240 bg-gray-700 rounded animate-pulse"></div>

            <div className='flex mt-4 gap-4'>
              <div className="h-12 w-52 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 w-52 bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className='flex flex-wrap items-start justify-start gap-4 mt-4'>
              <div className="w-[150px] h-[200px] bg-gray-700 rounded animate-pulse"></div>
              <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className='flex flex-wrap items-start justify-start gap-4 mt-4'>
              <div className="w-[150px] h-[200px] bg-gray-700 rounded animate-pulse"></div>
              <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700 rounded animate-pulse"></div>
              <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700 rounded animate-pulse"></div>
              <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700 rounded animate-pulse"></div>
              <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700 rounded animate-pulse"></div>
              <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </>
      );
    }
  
  return (
    <div className='flex flex-col mb-4 min-h-screen w-full px-10 overflow-hidden text-[var(--textPrimary)]'>
          <div className='mt-24 w-full flex flex-col md:grid md:grid-cols-3 justify-between items-center gap-4 border border-white/10 bg-[rgba(255,255,255,0.08)] backdrop-blur-sm p-5 rounded-2xl shadow-lg'>
            <span className='text-start md:text-3xl text-xl text-[var(--textPrimary)] font-bold uppercase'>{currentSerieDetails?.name}</span>
            <div className='flex flex-row items-center justify-center gap-3'>
            <span className='flex items-center justify-center m-0 gap-2 text-[var(--textSecondary)]'><span className='text-[var(--colorAccent)] font-semibold'>TMDB</span><svg className='w-4 h-4 fill-[var(--colorAccent)]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg><span className='text-[var(--textPrimary)] font-semibold'>{currentSerieDetails?.vote_average}</span></span>
            <span className='m-0 text-[0.7rem] text-[var(--textSecondary)]'>/{currentSerieDetails?.vote_count}K</span>
            </div>
                    <div className='gap-2 flex flex-row items-center justify-center text-[var(--textSecondary)]'>
              <span>Trending:</span>
              <span className='text-[0.9rem] text-[var(--colorAccent)] font-semibold'>{currentSerieDetails?.popularity}</span>
              </div>
          </div>
            <div className='max-w-full w-full h-full min-h-[400px] max-h-full flex flex-col md:grid md:grid-cols-2 overflow-hidden mt-2 items-center justify-center gap-6 relative rounded-2xl shadow-2xl bg-[rgba(0,0,0,0.2)]'>
                    <img className="w-full h-full object-cover object-center" src={`https://image.tmdb.org/t/p/original/${currentSerieDetails?.backdrop_path}`} alt={currentSerieDetails?.name} />
              <ShowTrailerSerie serieId={id} />
              
              <span className={`hidden md:flex absolute text-sm bottom-1 p-[0.28rem] left-1 ${currentSerieDetails?.in_production ? 'bg-[rgba(14,211,149,0.15)] text-[var(--colorAccent)]' : 'hidden'} font-semibold rounded-md`}>{currentSerieDetails?.in_production ? "In Production" : ""}</span>
            </div>
            <div className='flex flex-col items-start justify-start w-full h-full mt-4 gap-6'>
            <div className='flex flex-wrap gap-2 items-center justify-start'>
              {currentSerieDetails?.genres?.map(gen => (
                <span className='bg-[rgba(14,211,149,0.12)] border border-[rgba(255,255,255,0.12)] text-[var(--textSecondary)] px-3 py-1 rounded-full text-sm' key={gen.id}>{gen.name}</span>
                  ))}
            <div className='bg-[rgba(14,211,149,0.12)] border border-[rgba(255,255,255,0.12)] text-[var(--textSecondary)] px-3 py-1 rounded-full text-sm'>{currentSerieDetails?.first_air_date?.slice(0, 4)} - {" "}
              {currentSerieDetails?.last_air_date?.slice(0, 4)}</div>
            <span className='uppercase bg-[rgba(14,211,149,0.12)] border border-[rgba(255,255,255,0.12)] text-[var(--textSecondary)] px-3 py-1 rounded-full text-sm'>{currentSerieDetails?.languages?.map(language => (
              <span key={language}>{language}</span>
            ))}</span>
            </div>
            <p className='text-start text-md text-[var(--textSecondary)] leading-relaxed'>{currentSerieDetails?.overview}</p>
            <div className='flex md:flex-row flex-col items-start md:items-center justify-start gap-4 text-lg'>

            <div className='border border-white/10 px-12 py-3 bg-[rgba(255,255,255,0.06)] rounded-xl'>
              <span className='text-[var(--textPrimary)] font-semibold'>
              {currentSerieDetails?.number_of_seasons}
              </span>{" "}
              <span className='text-[var(--textSecondary)] font-semibold'>Seasons</span>
            </div>
            <div className='border border-white/10 px-12 py-3 bg-[rgba(255,255,255,0.06)] rounded-xl'>
              <span className='text-[var(--textPrimary)] font-semibold'>
              {currentSerieDetails?.number_of_episodes}
              </span>{" "}
              <span className='text-[var(--textSecondary)] font-semibold'>Episodes</span>
            </div>
            </div>

            <div className='gap-2 flex items-center justify-center '>
              <span className='text-[var(--textSecondary)] text-md'>Created by:</span>
              {currentSerieDetails?.created_by?.map(creator => (
                <span className='text-[var(--textPrimary)] font-semibold' key={creator.id}>{creator.name}</span>
              ))}
              </div>
            </div>
            <div className='flex flex-col items-start justify-start gap-1 mt-4'>
              <span className='border-l-4 border-[var(--colorAccent)] pl-3 uppercase font-bold text-xl text-[var(--textPrimary)]'>Reparto</span>
              <div className='grid gap-4 relative items-center justify-start w-full mt-2 grid-rows-1'>
                <ButtonsScrollRef serieRef={serieRef} reload={creditsSerie?.useCreditsSerie?.cast} />
                <div ref={serieRef}  className="overflow-hidden scroll-smooth py-4">
                  <div className='flex gap-4'>              
              {creditsSerie?.useCreditsSerie?.cast?.length > 0 ? creditsSerie?.useCreditsSerie?.cast?.map(casting => (
                <div key={casting.id} className='flex flex-col items-center justify-center'>
                  <img src={`https://image.tmdb.org/t/p/original${casting?.profile_path}`} alt={casting.name} className='w-[140px] h-[200px] rounded-md object-center'  />
                  <span className="w-[140px] truncate block text-center">{casting.original_name}</span>
                  <span className="w-[140px] truncate block text-[0.8rem] text-[var(--textSecondary)] text-center">Character: {casting.name}</span>
                </div>
              )) :
              <>
                    <Skeleton w={150} h={200} error={true} />
                    <Skeleton w={150} h={200} error={true} />
                  </>
                }
                </div>
                
                </div>
              </div>
              <div className=' flex flex-col w-full  items-center justify-center gap-1  mt-4'>
                <span className='text-start w-full border-l-4 border-[var(--colorAccent)] pl-3 uppercase font-bold text-xl text-[var(--textPrimary)]'>Similars</span>
                <div className={`grid grid-rows-1 gap-4 items-center justify-center w-full mt-2`} style={{gridTemplateColumns: `repeat(${getCant()}, minmax(0, 1fr))`}}>
                  {visible?.length > 0 ? visible?.map(serie => (
                    <img key={serie.id} src={`https://image.tmdb.org/t/p/original${serie?.poster_path}`} alt={serie?.name} onClick={() => navigate(`/series/details/${serie.id}`)} className='w-full h-[200px] rounded-md object-center cursor-pointer transition hover:scale-[1.02] duration-200' />
                  )
                )
                    :
                    <>
                              <Skeleton w={150} h={200} error={true} />
                    <Skeleton w={150} h={200} error={true} />
                    </>
                  }
                </div>
                <button className={`cursor-pointer mt-2 text-md rounded-md px-5 mb-4 py-2 bg-[var(--colorAccent)]/20 text-[var(--textPrimary)] hover:bg-[var(--colorAccent)]/40 transition ${visible?.length > 0 ? 'inline-flex' : 'hidden'}`} onClick={() => setIsVisible(prev => !prev)}>{isVisible ? 'View Less' : 'View More'}</button>
              </div>
                
            </div>
    </div>
  )
}
