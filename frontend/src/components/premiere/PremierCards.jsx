
import {usePremierSerie} from '../../hooks/usePremierSerie'
import { UserButtons } from '../UserButtons';
import { PremiereDetails } from './PremiereDetails';
export const PremierCards = () => {
  const { premiereSeries } = usePremierSerie();
  return (
    <div>
      {
        premiereSeries?.map(serie => (
          <div key={serie.id} className='grid grid-cols-[30%_40%_30%] items-center justify-center'>
          {serie.backdrop_path ?
            <div className='relative rounded-md m-2 w-[220px] h-[300px]'>
            <h2 className='absolute top-0 left-0 right-0 z-10 bg-gray-800/50'>{serie.name}</h2>
              <img key={serie.id} src={serie.backdrop_path ? `https://image.tmdb.org/t/p/w500${serie.backdrop_path}` : `https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} className='h-[300px] w-[220px] object-cover rounded-md shadow-md cursor-pointer ' />
            <button className='absolute rounded-md bottom-0 left-0 right-0 bg-cyan-600 cursor-pointer'>View Details</button>
            </div>
          : <div className='hidden'></div>}
          
            {
              serie.backdrop_path ? <div className=''><PremiereDetails serieId={serie.id}/></div> : <div className='hidden'></div>
            }
                        {
              serie.backdrop_path ? <div className=''><UserButtons serieId={serie.id}/></div> : <div className='hidden'></div>
          }
          </div>
        ))
      }
    </div>
  )
}