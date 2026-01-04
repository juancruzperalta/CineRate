import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailsMovie } from '../../hooks/movies/useDetailsMovie';

export const MoviesDetails = () => {
    // const navigate = useNavigate();
    // const [isVisible, setIsVisible] = useState(false)
    const { id } = useParams();
    // const [isLoading, setIsLoading] = useState(true)
    
    const { currentMovieDetails } = useDetailsMovie(id);
    // const similarSerie = useSimilarSerie(id);
    // const creditsSerie = useCreditsSerie(id);
    // const visible = isVisible ? similarSerie?.similarSerie?.results : 
    //   similarSerie?.similarSerie?.results?.slice(0, 8);
    // const movieRef = useRef(null);
  return (
    <div className='flex flex-col 2xl:max-w-[96vw] xl:max-w-[1200px] lg:max-w-[1000px]
    md:max-w-[700px] sm:max-w-[600px] max-w-[400px] mb-4 h-full min-h-100vh w-full overflow-hidden'>
          <div className='mt-24 w-full grid grid-cols-3 justify-around items-center border-1 border-gray-200/40 bg-gray-600/20 p-1'>
            <span className='text-start text-3xl text-gray-200 font-bold uppercase'>{currentMovieDetails?.name}</span>
            <div className='flex flex-row items-center justify-center '>
            <span className='flex items-center justify-center m-0 gap-1 '><svg className='w-4 h-4 fill-amber-300' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg> {currentMovieDetails?.vote_average}</span>
            <span className='m-0 text-[0.7rem] text-gray-300'>/{currentMovieDetails?.vote_count}K</span>
            </div>
                    <div className='gap-2 flex flex-row items-center justify-center '>
              <span>Trending:</span>
              <span className='text-[0.9rem] text-gray-300'>{currentMovieDetails?.popularity}</span>
              </div>
          </div>
            <div className='max-w-full w-full h-full min-h-[400px] max-h-full grid grid-cols-2 overflow-hidden mt-2 items-center justify-center gap-6 relative'>
                    <img className="overflow-hidden p-0 m-0 w-full h-full  object-cover object-center" src={`https://image.tmdb.org/t/p/original/${currentMovieDetails?.backdrop_path}`} alt={currentMovieDetails?.name} />
              {/* <ShowTrailerSerie serieId={id} /> */}
              <span className={`absolute text-sm bottom-1 p-[0.23rem] left-1 ${currentMovieDetails?.in_production ? 'bg-green-300' : 'hidden'} text-black font-semibold`}>{currentMovieDetails?.in_production ? "In Production" : ""}</span>
            </div>
            <div className='flex flex-col items-start justify-start w-full h-full mt-4 gap-6'>
            <div className='flex gap-2 items-center justify-start'>
              {currentMovieDetails?.genres?.map(gen => (
                <span className='border-1 border-gray-200/40 bg-gray-600/20 p-1 rounded-md' key={gen.id}>{gen.name}</span>
                  ))}
            <div className='border-1 border-gray-200/40 bg-gray-600/20 p-1 rounded-md'>{currentMovieDetails?.first_air_date?.slice(0, 4)} - {" "}
              {currentMovieDetails?.last_air_date?.slice(0, 4)}</div>
            <span className='uppercase border-1 border-gray-200/40 bg-gray-600/20 p-1 rounded-md'>{currentMovieDetails?.languages?.map(language => (
              <span key={language}>{language}</span>
            ))}</span>
            </div>
            <p className='text-start text-md'>{currentMovieDetails?.overview}</p>
            <div className='flex items-center justify-start gap-4 text-lg'>

            <div className='border-1 border-gray-200/40 px-14 py-3 bg-gray-100'>
              <span className='text-black font-semibold'>
              {currentMovieDetails?.number_of_seasons}
              </span>{" "}
              <span className='text-black font-semibold'>Seasons</span>
            </div>
            <div className='border-1 border-gray-200/40 px-14 py-3 bg-gray-100'>
              <span className='text-black font-semibold'>
              {currentMovieDetails?.number_of_episodes}
              </span>{" "}
              <span className='text-black font-semibold'>Episodes</span>
            </div>
            </div>

            <div className='gap-2 flex items-center justify-center '>
              <span className='text-gray-200 text-md'>Created by:</span>
              {currentMovieDetails?.created_by?.map(creator => (
                <span className='text-gray-100 font-semibold' key={creator.id}>{creator.name}</span>
              ))}
              </div>
            </div>
            {/* <div className=' flex flex-col items-start justify-start gap-1 mt-4'>
              <span className='border-l-3 border-[var(--colorAccent)] pl-2 uppercase font-bold text-xl'>Reparto</span>
              <div className='flex items-start justify-start gap-4 overflow-hidden scroll-smooth xl:max-w-[1200px] 2xl:max-w-[96vw] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px] relative'>
                <ButtonsScrollRef serieRef={serieRef} reload={creditsSerie?.useCreditsSerie?.cast} />
                <div ref={serieRef}  className="overflow-hidden scroll-smooth py-4">
                  <div className='flex gap-4'>              
              {creditsSerie?.useCreditsSerie?.cast?.length > 0 ? creditsSerie?.useCreditsSerie?.cast?.map(casting => (
                <div key={casting.id} className='flex flex-col items-center justify-center'>
                  <img src={`https://image.tmdb.org/t/p/original${casting?.profile_path}`} alt={casting.name} className='w-[150px] h-[200px] rounded-md object-center'  />
                  <span className="w-[150px] truncate block text-center">{casting.original_name}</span>
                  <span className="w-[150px] truncate block text-[0.8rem] text-gray-300 text-center">Character: {casting.name}</span>
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
                <span className='text-start w-full border-l-3 border-[var(--colorAccent)] pl-2 uppercase font-bold text-xl'>Similars</span>
                <div className={`grid ${isVisible ? `grid-rows-${similarSerie.length/8}` : 'grid-rows-1'} grid-cols-8 gap-4 items-center justify-center w-full mt-2`}>
                  {visible?.length > 0 ? visible?.map(serie => (
                    <img key={serie.id} src={`https://image.tmdb.org/t/p/original${serie?.poster_path}`} alt={serie?.name} onClick={() => navigate(`/series/details/${serie.id}`)} className='w-[150px] h-[200px] rounded-md object-center cursor-pointer' />
                  )
                )
                    :
                    <>
                              <Skeleton w={150} h={200} error={true} />
                    <Skeleton w={150} h={200} error={true} />
                    </>
                  }
                </div>
                <button className={`cursor-pointer mt-2 text-md border-1 border-gray-200/40 bg-gray-700/20 p-1 rounded-md hover:bg-gray-800/60 ${isVisible ? 'hidden' : 'flex'} ${visible?.length > 0 ? 'flex' : 'hidden'}`} onClick={() => setIsVisible(true)}>Ver Más</button>
              </div>
                
            </div> */}
    </div>
  )
}
