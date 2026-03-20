import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailsMovie } from '../../hooks/movies/useDetailsMovie';
import { useSimilarMovie } from '../../hooks/movies/useSimilarMovie';
import { useCreditsMovie } from '../../hooks/movies/useCreditsMovie';
import { Skeleton } from '../../components/helpers/Skeleton';
import { ButtonsScrollRef } from '../../components/helpers/ButtonsScrollRef';

export const MoviesDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isVisible, setIsVisible] = useState(false)
    const { currentMovieDetails } = useDetailsMovie(id);
    const { similarMovie } = useSimilarMovie(id);
    const movieRef = useRef(null);
    const { creditsMovie } = useCreditsMovie(id);
    
    const [isLoading, setIsLoading] = useState(true)
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
  const visible = isVisible ? similarMovie?.results : 
    similarMovie?.results?.slice(0, getCant());

 useEffect(() => {
    if (currentMovieDetails) { 
      setIsLoading(false);
    }
  }, [currentMovieDetails])
  
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
  
  
  
    if (isLoading) {
      return (
      <>
          <div className="flex flex-col w-full px-10 mb-4 min-h-screen overflow-hidden text-[var(--textPrimary)]">
              <div className='mt-24 w-full h-[40px] rounded-2xl bg-gray-700 animate-pulse p-1' />
              <div className='max-w-full w-full h-[400px] min-h-[400px] flex overflow-hidden mt-4 items-center justify-center gap-6 relative rounded-2xl bg-[rgba(255,255,255,0.04)]'>
               <div className="h-full w-full bg-gray-700 rounded animate-pulse mb-2"></div>
              </div>
              <div className='flex gap-2 mt-2'>
                <div className="h-8 w-30 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-30 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-26 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="mt-6 h-4 p-1 w-full md:w-240 bg-gray-700 rounded animate-pulse"></div>
              <div className='flex mt-4 gap-4'>
              <div className="h-12 w-52 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 w-52 bg-gray-700 rounded animate-pulse"></div>
              </div>
          <div className='md:flex md:flex-wrap items-start justify-start gap-4 mt-4'>
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
            <span className='text-start text-xl md:text-3xl text-[var(--textPrimary)] font-bold uppercase'>{currentMovieDetails?.title}</span>
            <div className='flex flex-row items-center justify-center gap-3'>
              <span className='flex items-center justify-center m-0 gap-2 text-[var(--textSecondary)]'><span className='text-[var(--colorAccent)] font-semibold'>TMDB</span><svg className='w-4 h-4 fill-[var(--colorAccent)]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg><span className='text-[var(--textPrimary)] font-semibold'>{currentMovieDetails?.vote_average}</span></span>
              <span className='m-0 text-[0.7rem] text-[var(--textSecondary)]'>/{currentMovieDetails?.vote_count}K</span>
            </div>
            <div className='gap-2 flex flex-row items-center justify-center text-[var(--textSecondary)]'>
              <span>Trending:</span>
              <span className='text-[0.9rem] text-[var(--colorAccent)] font-semibold'>{currentMovieDetails?.popularity}</span>
            </div>
          </div>
            <div className='max-w-full w-full h-full md:min-h-[400px] md:max-h-[400px] flex overflow-hidden mt-2 items-center justify-center gap-6 relative rounded-2xl shadow-2xl bg-[rgba(0,0,0,0.2)]'>
              {currentMovieDetails?.backdrop_path ?( 
              <img className="w-full h-full object-cover object-center" src={`https://image.tmdb.org/t/p/original/${currentMovieDetails?.backdrop_path}`} alt={currentMovieDetails?.name} /> 
              ):  (<div className="w-full h-full flex items-center justify-center bg-gray-700 rounded animate-pulse"><span>{currentMovieDetails?.name} : IMAGE IS NOT LOAD</span></div>)}
              <div className='absolute text-sm left-1 bottom-1 flex items-center justify-center gap-2'>
                <span className='border border-white/10 p-[0.28rem] bg-[rgba(14,211,149,0.15)] text-[var(--colorAccent)] font-semibold rounded-md'>{currentMovieDetails?.release_date?.slice(0, 4)}</span>
                <span className={`text-sm border border-white/10 p-[0.28rem] bg-[rgba(14,211,149,0.15)] ${currentMovieDetails?.runtime ? 'flex' : 'hidden'} text-[var(--colorAccent)] font-semibold rounded-md`}>{currentMovieDetails?.runtime ? `${Math.floor(currentMovieDetails.runtime / 60)}h ${currentMovieDetails.runtime % 60}m` : ''}</span>
                <span className='border border-white/10 p-[0.28rem] bg-[rgba(14,211,149,0.15)] text-[var(--colorAccent)] font-semibold uppercase rounded-md'>{currentMovieDetails?.original_language}</span>
              </div>
            </div>
            <div className='flex flex-col items-start justify-start w-full h-full mt-4 gap-6'>
              <div className='flex flex-wrap gap-2 items-center justify-start'>
                {currentMovieDetails?.genres?.map(gen => (
                  <span className='bg-[rgba(14,211,149,0.12)] border border-[rgba(255,255,255,0.12)] text-[var(--textSecondary)] px-3 py-1 rounded-full text-sm' key={gen.id}>{gen.name}</span>
                    ))}
              </div>
              <p className='text-start text-md text-[var(--textSecondary)] leading-relaxed'>{currentMovieDetails?.overview}</p>
                      <div className='w-full h-full flex items-center justify-center flex-col'>
                      <span className='uppercase font-bold text-[var(--textSecondary)] text-xl mb-2'>{currentMovieDetails?.belongs_to_collection?.name}</span>
                <div className='w-[40%] h-[65%] border border-white/10 bg-[rgba(255,255,255,0.06)] p-1 rounded-md shadow-md'>
                  {currentMovieDetails?.belongs_to_collection?.backdrop_path ?
                    <img className="overflow-hidden p-0 m-0 w-full h-full  object-cover object-center rounded-md" src={`https://image.tmdb.org/t/p/original/${currentMovieDetails?.belongs_to_collection?.backdrop_path}`} alt={currentMovieDetails?.belongs_to_collection?.name} /> : 
                    <span className='font-semibold text-[var(--textSecondary)]'>ERROR TO SEARCH COLLECTION</span>
                    }
                </div>
            </div>
                    <div className='relative flex flex-col items-start justify-start gap-1 mt-4'>

                      <span className='border-l-4 border-[var(--colorAccent)] pl-3 uppercase font-bold text-lg md:text-xl text-[var(--textPrimary)]'>Reparto</span>
          <div className='grid gap-4 items-center justify-center w-full mt-2 grid-rows-1'>
                <ButtonsScrollRef serieRef={movieRef} reload={creditsMovie?.cast} />
                <div ref={movieRef}  className="overflow-hidden scroll-smooth py-4">
                  <div className='flex gap-4'>              
              {creditsMovie?.cast?.length > 0 ? creditsMovie?.cast?.map(casting => (
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
              </div></div>
           <div className='flex flex-col w-full items-center justify-center gap-1 mt-4'>
                <span className='text-start w-full border-l-4 border-[var(--colorAccent)] pl-3 uppercase font-bold text-xl text-[var(--textPrimary)]'>Similars</span>
          <div className={`grid grid-rows-1 gap-4 items-center justify-center w-full mt-2`} style={{gridTemplateColumns: `repeat(${getCant()}, minmax(0, 1fr))`}}>
                  {visible?.length > 0 ? visible?.map(movie => (
                    <img key={movie.id} src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt={movie?.name} onClick={() => navigate(`/movies/details/${movie.id}`)} className='w-full h-[200px] rounded-md object-center cursor-pointer transition hover:scale-[1.02] duration-200' />
                  )): <>
                    <div className='flex w-full gap-8'>
                    <Skeleton w={150} h={200} error={true} />
                    </div>
                                    <div className='flex w-full gap-8'>
                    <Skeleton w={150} h={200} error={true} />
                                    </div>
                    </>
            }
            </div>  
            <button className={`cursor-pointer mt-2 text-md rounded-md px-5 py-2 bg-[var(--colorAccent)]/20 text-[var(--textPrimary)] hover:bg-[var(--colorAccent)]/40 transition ${visible?.length > 0 ? 'inline-flex' : 'hidden'}`} onClick={() => setIsVisible(prev => !prev)}>{isVisible ? 'View Less' : 'View More'}</button>
          </div>
        </div>
      </div>
  )
}
