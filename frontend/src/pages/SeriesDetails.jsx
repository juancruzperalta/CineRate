import React from 'react'
import { useParams } from 'react-router-dom';
  import { useDetailsSerie } from '../hooks/useDetailsSerie';
import { ShowTrailerSerie } from '../components/trailer/ShowTrailerSerie';
import { useCreditsSerie } from '../hooks/useCreditsSerie';
export const SeriesDetails = () => {
  const { id } = useParams();
  const { currentSerieDetails } = useDetailsSerie(id);
  const creditsSerie = useCreditsSerie(id);
  return (
    <div className='flex flex-col 2xl:max-w-[96vw] xl:max-w-[1200px] lg:max-w-[1000px]
    md:max-w-[700px] sm:max-w-[600px] max-w-[400px] mb-4 h-full min-h-100vh w-full overflow-hidden'>
      <div className='mt-24 w-full grid grid-cols-3 justify-around items-center border-1 border-gray-200/40 bg-gray-600/20 p-1'>
        <span className='text-start text-3xl text-gray-200 font-bold uppercase'>{currentSerieDetails?.name}</span>
        <div className='flex flex-row items-center justify-center '>
        <span className='flex items-center justify-center m-0 gap-1 '><svg className='w-4 h-4 fill-amber-300' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg> {currentSerieDetails?.vote_average}</span>
        <span className='m-0 text-[0.7rem] text-gray-300'>/{currentSerieDetails?.vote_count}K</span>
        </div>
                <div className='gap-2 flex flex-row items-center justify-center '>
          <span>Trending:</span>
          <span className='text-[0.9rem] text-gray-300'>{currentSerieDetails?.popularity}</span>
          </div>
      </div>
      <div className='max-w-full w-full h-full min-h-[400px] max-h-full grid grid-cols-2 overflow-hidden mt-2 items-center justify-center gap-6 relative'>
        <img className="overflow-hidden p-0 m-0 w-full h-full  object-cover object-center" src={`https://image.tmdb.org/t/p/original/${currentSerieDetails?.backdrop_path}`} alt={currentSerieDetails?.name} />
        <ShowTrailerSerie serieId={id} />
          <span className='absolute bottom-1 p-1 rounded-md left-1 bg-green-300 text-black font-semibold'>{currentSerieDetails?.in_production ? "In Production" : ""}</span>
      </div>
        <div className='flex flex-col items-start justify-start w-full h-full mt-4 gap-2'>
        <div className='flex gap-2 items-center justify-start'>
          {currentSerieDetails?.genres?.map(gen => (
            <span className='border-1 border-gray-200/40 bg-gray-600/20 p-1 rounded-md' key={gen.id}>{gen.name}</span>
              ))}
        <div>{currentSerieDetails?.first_air_date?.slice(0, 4)} - {" "}
          {currentSerieDetails?.last_air_date?.slice(0, 4)}</div>
        </div>
        <span>{currentSerieDetails?.languages?.map(language => (
          <span key={language}>{language}</span>
        ))}</span>
        <span>episodes{currentSerieDetails?.number_of_episodes}</span>
        <span>seasons {currentSerieDetails?.number_of_seasons}</span>

          <p className='text-start'>{currentSerieDetails?.overview}</p>
        <div className='gap-2 flex items-center justify-center '>
          <span>Created by:</span>
          {currentSerieDetails?.created_by?.map(creator => (
            <span key={creator.id}>{creator.name}</span>
          ))}
          </div>
        </div>
      <div className=' flex flex-col items-start justify-start gap-1'>
        <span>Reparto</span>
        <div className='flex gap-4'>

        {creditsSerie?.useCreditsSerie?.cast?.map(casting => (
          <div key={casting.id} className='flex flex-col items-center justify-center'>
            <img src={`https://image.tmdb.org/t/p/original${casting?.profile_path}`} alt={casting.name} className='w-[150px] h-[200px] rounded-md object-center' />
            <span>{casting.original_name}</span>
            <span className="text-[0.8rem] text-gray-300 max-w-[150px] truncate block">Character: {casting.name}</span>
          </div>
        ))}
        </div>
        </div>
      </div>
  )
}
