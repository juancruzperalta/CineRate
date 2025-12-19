
import { useEffect, useState } from 'react';
import { UserButtons } from '../UserButtons';
import { PremiereDetails } from './PremiereDetails';
export const PremierCards = ({premiereSeries}) => {
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (premiereSeries && premiereSeries.length > 0) {
    setIsLoading(false);
  }
}, [premiereSeries]);
  return (
    <div>
      {
        isLoading ? (
                   <div className='grid grid-cols-[25%_35%_40%] items-center justify-center overflow-hidden '>
            {Array.from({ length: 8 }).map((_, i) => (
              <>
          <div
            key={i}
            className='relative m-2 w-[220px] h-[300px]
            rounded-md bg-gray-800 animate-pulse
            shadow-[0_10px_10px_rgba(0,0,0,0.7)]'
                ></div>
                <div className='relative h-full flex items-center justify-center'>
                  
          <div className="space-y-2 ">
          <div className="h-6 w-48 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-56 bg-gray-700 rounded animate-pulse"></div>

          <div className="flex gap-4 mt-3 absolute bottom-2 ">
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                  </div>
  </div>
                </div>         
                 <div className="space-y-2 flex items-center justify-center flex-col">
                  <div className="h-10 w-10 bg-gray-700 animate-pulse rounded-full"></div>
                      <div className="h-4 w-28 bg-gray-700 rounded animate-pulse"></div>
                </div>    
            </>
            ))}
                    </div>
        ) :(
        premiereSeries?.map(serie => (
          <div key={serie.id} className={`grid grid-cols-[30%_70%] mt-0 items-center justify-center bg-gray-200/5 overflow-hidden ${(serie.backdrop_path || serie.poster_path) ? 'border-b-2 border-gray-800/50 p': 'border-b-0 p-0'}`}>
          {(serie.backdrop_path || serie.poster_path) ?
                <div className='relative m-2 w-[220px] h-[300px]   backdrop-blur-md rounded-md shadow-[0_10px_10px_rgba(0,0,0,0.7)] hover:scale-[1.01] transition-all '>
                  <h2 className='absolute top-0 left-0 right-0 z-10 bg-gray-800/50'>{serie.name}</h2>
                  <img key={serie.id} src={serie.backdrop_path ? `https://image.tmdb.org/t/p/w500${serie.backdrop_path}` : `https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} className='h-[300px] w-[220px] object-cover rounded-md shadow-md cursor-pointer overflow-hidden' />
                </div>
                :
                <div className="hidden overflow-hidden"></div>
            }
            {
              (serie.backdrop_path || serie.poster_path) ? <div className='relative h-full overflow-hidden'><PremiereDetails serieId={serie.id} />
              <div className=''><UserButtons serieId={serie.id}/></div>
              </div> : <div className='hidden'></div>
            }
            </div>
          ))
      )}
      </div>
  )
}