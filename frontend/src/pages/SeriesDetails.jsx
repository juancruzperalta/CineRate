import React from 'react'
import { useParams } from 'react-router-dom';
  import { useDetailsSerie } from '../hooks/useDetailsSerie';
import { ShowTrailerSerie } from '../components/trailer/ShowTrailerSerie';
export const SeriesDetails = () => {
  const { id } = useParams();
  const { currentSerieDetails } = useDetailsSerie(id);
  
  console.log(currentSerieDetails)
  return (
    <div className='flex flex-col 2xl:max-w-[96vw] xl:max-w-[1200px] lg:max-w-[1000px]
    md:max-w-[700px] sm:max-w-[600px] max-w-[400px] h-dvh min-h-100vh w-full overflow-hidden'>
      <div className='max-w-full w-full h-full min-h-[400px] max-h-full grid grid-cols-2 overflow-hidden mt-24  items-center justify-center gap-6'>
        <img className="overflow-hidden p-0 m-0 w-full h-full  object-cover object-center" src={`https://image.tmdb.org/t/p/original/${currentSerieDetails?.backdrop_path}`} alt={currentSerieDetails?.name} />
        <ShowTrailerSerie serieId={id} />
        <div className='flex flex-col items-start justify-start w-[400px] h-[400px] '>
          <span className='text-start text-2xl text-gray-300 font-bold uppercase'>{currentSerieDetails?.name}</span>
          <div className='flex gap-2'>{currentSerieDetails?.genres?.map(gen => (
            <span className='border-1 border-gray-200/40 bg-gray-600/20 p-1 rounded-md' key={gen.id}>{gen.name}</span>
              ))}
          </div>          
        </div>
      </div>
      </div>
  )
}
