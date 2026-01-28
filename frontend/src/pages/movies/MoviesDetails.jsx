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
          <div className="flex flex-col w-full px-10 mb-4 h-full min-h-100vh w-full overflow-hidden ">
              <div className='mt-24 w-full h-[40px] justify-around items-center bg-gray-700/50 animate-pulse  p-1'>
            
                </div>
              <div className='max-w-full w-full h-[400px] min-h-[400px] max-h-full flex overflow-hidden mt-4 items-center justify-center gap-6 relative'>
               <div className="h-full w-full bg-gray-700/50 rounded animate-pulse mb-2"></div>
              </div>
              <div className='flex gap-2 mt-2'>
                <div className="h-8 w-30 bg-gray-700/50 rounded animate-pulse"></div>
                <div className="h-8 w-30 bg-gray-700/50 rounded animate-pulse"></div>
                <div className="h-8 w-26 bg-gray-700/50 rounded animate-pulse"></div>
              </div>
              <div className="mt-6 h-4 p-1 w-fullmd:w-240 bg-gray-700/50 rounded animate-pulse"></div>
              <div className='flex mt-4 gap-4'>
              <div className="h-12 w-52 bg-gray-700/50 rounded animate-pulse"></div>
              <div className="h-12 w-52 bg-gray-700/50 rounded animate-pulse"></div>
              </div>
          <div className='md:flex md:flex-wrap items-start justify-start gap-4 mt-4'>
                <div className="w-[150px] h-[200px] bg-gray-700/50 rounded animate-pulse"></div>
                <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700/50 rounded animate-pulse"></div>
              </div>
                    <div className='flex flex-wrap items-start justify-start gap-4 mt-4'>
                <div className="w-[150px] h-[200px] bg-gray-700/50 rounded animate-pulse"></div>
                <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700/50 rounded animate-pulse"></div>
                <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700/50 rounded animate-pulse"></div>
                <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700/50 rounded animate-pulse"></div>
                <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700/50 rounded animate-pulse"></div>
                <div className="w-[150px] h-[200px] hidden md:flex bg-gray-700/50 rounded animate-pulse"></div>
              </div>
          </div>
                  
      </>
      );
    }
  
  
  return (
    <div className='flex flex-col  mb-4 h-full min-h-100vh  w-full px-10  overflow-hidden'>
          <div className='mt-24 w-full flex flex-col md:grid md:grid-cols-3 justify-around items-center border-1 border-gray-200/40 bg-gray-600/20 p-1'>
            <span className='text-start text-xl md:text-3xl text-gray-200 font-bold uppercase'>{currentMovieDetails?.title}</span>
              <div className='flex flex-row items-center justify-center '>
              <span className='flex items-center justify-center m-0 gap-1 '>TMDB<svg className='w-4 h-4 fill-amber-300' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg> {currentMovieDetails?.vote_average}</span>
              <span className='m-0 text-[0.7rem] text-gray-300'>/{currentMovieDetails?.vote_count}K</span>
              </div>
              <div className='gap-2 flex flex-row items-center justify-center '>
              <span>Trending:</span>
              <span className='text-[0.9rem] text-gray-300'>{currentMovieDetails?.popularity}</span>
              </div>
          </div>
            <div className='max-w-full w-full h-full  md:min-h-[400px] md:max-h-[400px] flex overflow-hidden mt-2 items-center justify-center gap-6 relative'>
              <img className="overflow-hidden p-0 m-0 w-full h-full  object-cover object-center" src={`https://image.tmdb.org/t/p/original/${currentMovieDetails?.backdrop_path}`} alt={currentMovieDetails?.name} />
           <div className='absolute text-sm left-1 bottom-1 flex items-center justify-center gap-2'>
              <span className='border-1 border-gray-900/70 p-[0.23rem]  bg-green-300/85  text-black font-semibold'>{currentMovieDetails?.release_date?.slice(0, 4)}</span>
              <span className={`text-sm border-1 border-gray-900/70 p-[0.23rem]  bg-green-300/85 ${currentMovieDetails?.runtime ? 'bg-green-300/85' : 'hidden'} text-black font-semibold`}>{currentMovieDetails?.runtime ? `${Math.floor(currentMovieDetails.runtime / 60)}h ${currentMovieDetails.runtime % 60}m` : 'Loading...'}</span>
              <span className='border-1 border-gray-900/70 p-[0.23rem]  bg-green-300/85 text-black font-semibold uppercase'>{currentMovieDetails?.original_language}</span>
              </div>
            </div>
            <div className='flex flex-col items-start justify-start w-full h-full mt-4 gap-6'>
              <div className='flex gap-2 items-center justify-start'>
                {currentMovieDetails?.genres?.map(gen => (
                  <span className='border-1 border-gray-200/40 bg-gray-600/20 p-1 rounded-md' key={gen.id}>{gen.name}</span>
                    ))}
              </div>
              <p className='text-start text-md'>{currentMovieDetails?.overview}</p>
                      <div className='w-full h-full flex items-center justify-center flex-col'>
                <span className='uppercase font-bold text-gray-400 text-xl mb-2'>{currentMovieDetails?.belongs_to_collection?.name}</span>
                <div className='w-[40%] h-[65%] border-1 border-gray-200/40 bg-gray-600/20 p-1 rounded-md shadow-md'>
                  {currentMovieDetails?.belongs_to_collection?.backdrop_path ?
                    <img className="overflow-hidden p-0 m-0 w-full h-full  object-cover object-center rounded-md" src={`https://image.tmdb.org/t/p/original/${currentMovieDetails?.belongs_to_collection?.backdrop_path}`} alt={currentMovieDetails?.belongs_to_collection?.name} /> : 
                    <span className='font-semibold text-gray-400'>ERROR TO SEARCH COLLECTION</span>
                    }
                </div>
            </div>
                    <div className='relative flex flex-col items-start justify-start gap-1 mt-4'>

                      <span className='border-l-3 border-[var(--colorAccent)] pl-2 uppercase font-bold text-lg md:text-xl'>Reparto</span>
          <div className='grid gap-4 items-center justify-center w-full mt-2 grid-rows-1'>
                <ButtonsScrollRef serieRef={movieRef} reload={creditsMovie?.cast} />
                <div ref={movieRef}  className="overflow-hidden scroll-smooth py-4">
                  <div className='flex gap-4'>              
              {creditsMovie?.cast?.length > 0 ? creditsMovie?.cast?.map(casting => (
                <div key={casting.id} className='flex flex-col items-center justify-center'>
                  <img src={`https://image.tmdb.org/t/p/original${casting?.profile_path}`} alt={casting.name} className='w-[140px] h-[200px] rounded-md object-center'  />
                  <span className="w-[140px] truncate block text-center">{casting.original_name}</span>
                  <span className="w-[140px] truncate block text-[0.8rem] text-gray-300 text-center">Character: {casting.name}</span>
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
           <div className=' flex flex-col w-full  items-center justify-center gap-1  mt-4'>
                <span className='text-start w-full border-l-3 border-[var(--colorAccent)] pl-2 uppercase font-bold text-xl'>Similars</span>
          <div className={`grid ${isVisible ? `grid-rows-${similarMovie.length / 8}` : 'grid-rows-1'} gap-4 items-center justify-center w-full mt-2`} style={{gridTemplateColumns: `repeat(${getCant()}, minmax(0,1fr)`}}>
                  {visible?.length > 0 ? visible?.map(movie => (
                    <img key={movie.id} src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt={movie?.name} onClick={() => navigate(`/movies/details/${movie.id}`)} className='w-full h-[200px] rounded-md object-center cursor-pointer' />
                  )): <>
                    <Skeleton w={150} h={200} error={true} />
                    <Skeleton w={150} h={200} error={true} />
                    </>
            }
            </div>  
            <button className={`cursor-pointer mt-2 text-md border-1 border-gray-200/40 bg-gray-700/20 p-1 rounded-md hover:bg-gray-800/60 ${isVisible ? 'hidden' : 'flex'} ${visible?.length > 0 ? 'flex' : 'hidden'}`} onClick={() => setIsVisible(true)}>Ver Más</button>
          </div>
        </div>
      </div>
  )
}
