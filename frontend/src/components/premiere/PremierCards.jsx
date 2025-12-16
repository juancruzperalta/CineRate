
import {usePremierSerie} from '../../hooks/usePremierSerie'
import { UserButtons } from '../UserButtons';
import { PremiereDetails } from './PremiereDetails';
export const PremierCards = () => {
  const { premiereSeries } = usePremierSerie();
  return (
    <div>
      {
        premiereSeries?.map(serie => (
          <div key={serie.id} className='grid grid-cols-[30%_70%] items-center justify-center'>
          {(serie.backdrop_path || serie.poster_path)?
            <div className='relative m-2 w-[220px] h-[300px]   backdrop-blur-md 
  rounded-md
  shadow-[0_10px_10px_rgba(0,0,0,0.7)] hover:scale-[1.01] transition-all'>
            <h2 className='absolute top-0 left-0 right-0 z-10 bg-gray-800/50'>{serie.name}</h2>
              <img key={serie.id} src={serie.backdrop_path ? `https://image.tmdb.org/t/p/w500${serie.backdrop_path}` : `https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} className='h-[300px] w-[220px] object-cover rounded-md shadow-md cursor-pointer ' />
            </div>
          : <div className='hidden'></div>}
          
            {
              (serie.backdrop_path || serie.poster_path) ? <div className='relative h-full'><PremiereDetails serieId={serie.id} />
              <div className=''><UserButtons serieId={serie.id}/></div>
              </div> : <div className='hidden'></div>
            }
          </div>
        ))
      }
    </div>
  )
}