
import { useNavigate } from 'react-router-dom';
import { useDetailsMovie } from '../../hooks/movies/useDetailsMovie';
import { useDetailsSerie } from '../../hooks/series/useDetailsSerie'

export const SeriesOrMovieDetails = ({serieId, serie}) => {
    const navigate = useNavigate();
  const serieDetails = useDetailsSerie(serie ? serieId : null);
  const currentMovieDetails = useDetailsMovie(!serie ? serieId : null);
  const currentDetails = serie ? serieDetails?.currentSerieDetails : currentMovieDetails?.currentMovieDetails;
// Lo que hacemos acá es que : los detalles de la serie los pide según verdadero o true (si es serie o pelicula), entonces pide, hay que hacer el llamado a movies. (En backend)

return (
    <> 
      <div className='w-full h-full flex flex-col lg:grid lg:grid-cols-[1fr_0.4fr] items-center justify-center gap-6 overflow-hidden text-sm lg:text-base 2xl:text-lg'>
      <div className='max-h-full w-full h-full z-10 items-start justify-center flex flex-col overflow-hidden lg:px-0'>
        <div className="pt-1 flex flex-col text-[0.9rem] text-gray-300 max-w-full">
          <h2 className='items-start text-start flex text-xl md:text-3xl font-semibold text-gray-100 border-b-2 border-gray-600'>{serie ? currentDetails?.name : currentDetails?.title}</h2>
            <span className='items-start flex text-[var(--colorAccent)] text-[0.9rem] md:text-[1rem]  font-semibold'>{serie ? currentDetails?.first_air_date : currentDetails?.release_date}</span>
        </div>
        <div className="flex flex-wrap items-center text-[0.9rem] md:text-[1rem]  gap-2 text-gray-300/70">
          <ul className='flex items-center gap-1 font-semibold'>Languages{(currentDetails?.languages?.length > 0 ? currentDetails.languages : currentDetails?.origin_country || ['Loading...']).map((lang) => (
                  <span className='uppercase font-semibold text-[var(--colorAccent)]' key={lang}>
              [{lang}]
            </span>
              ))
              }
        <p className='font-semibold'>Origin:</p>
            <span className='font-semibold text-[var(--colorAccent)]'>{currentDetails?.origin_country?.length > 0 ? (currentDetails?.origin_country?.map(orig => (<span key={orig}>{orig}</span>))) : (
                <span  className='uppercase font-semibold text-[var(--colorAccent)]'>Loading...</span>
          )
        }</span>
          </ul>
        </div>
          <div className='flex flex-col max-w-full flex-wrap'>
          {serie ? 
              <div className='flex lg:flex-row flex-col max-w-full flex-wrap lg:items-center items-start lg:gap-2 gap-1 text-gray-300'>
              <p className='flex gap-2'>Seasons:<span className='font-semibold  max-w-14'>{currentDetails?.number_of_seasons ? currentDetails?.number_of_seasons : 'Loading...'}</span></p>
              <p className='flex gap-2'>Episodes:<span className='font-semibold  max-w-14'>{currentDetails?.number_of_episodes ? currentDetails?.number_of_episodes : 'Loading...'}</span></p>
                <p className='flex gap-2'>Status:<span className="font-semibold text-[var(--colorAccent)]">{currentDetails?.status ? currentDetails?.status : 'Loading...'}</span></p>
              </div>
              :
              <div className='flex items-center gap-2 text-gray-300'>
              <p className='flex gap-2'>Duration:<span className="font-semibold ">{currentDetails?.runtime
                      ? `${Math.floor(currentDetails.runtime / 60)}h ${currentDetails.runtime % 60}m`
                      : 'Loading...'}</span></p>
              </div>
          }
            <div className='flex items-start lg:items-center gap-2 text-gray-300 flex-col lg:flex-row lg:mt-0 mt-2'>
              
              {currentDetails?.genres?.map((gen, index) => (
                index <= 3 && (<li className="max-h-6 font-semibold rounded-sm max-w-full overflow-hidden"  key={gen.id}
                  > {gen.name}</li>
                )
              ))}
              </div>
              <button 
              className='flex items-center justify-center bg-gray-800/40 hover:bg-gray-800/70 font-semibold rounded-full cursor-pointer text-md text-gray-300 px-2 py-1 mt-2 transition' 
              onClick={(serie) ? () => navigate(`/series/details/${serieId}`) : () => navigate(`/movies/details/${serieId}`)}>
              Details
            </button>
          </div>
      </div>
        <div className='md:mt-2  z-10 relative w-full items-center justify-center flex'>
            <a className='cursor-pointer flex flex-col items-center justify-center hover:scale-[1.01] transition-all' href={currentDetails?.homepage} target='_blank' rel='nopeener norefferer'><span><svg className={`w-12 h-12 ${currentDetails?.homepage ? 'fill-blue-400' : 'fill-red-400' }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM252.3 211.1C244.7 215.3 240 223.4 240 232L240 408C240 416.7 244.7 424.7 252.3 428.9C259.9 433.1 269.1 433 276.6 428.4L420.6 340.4C427.7 336 432.1 328.3 432.1 319.9C432.1 311.5 427.7 303.8 420.6 299.4L276.6 211.4C269.2 206.9 259.9 206.7 252.3 210.9z" /></svg></span>          {currentDetails?.homepage ? <span>{serie ? 'Watch Serie' : 'Watch Movie'}</span>
            : <span>Fail to Load Link</span>}</a>
        </div>
      </div>
    </>
  )
}
