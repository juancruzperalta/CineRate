
import { useDetailsSerie } from '../../hooks/useDetailsSerie'
export const PremiereDetails = ({serieId}) => {

  const { currentSerieDetails } = useDetailsSerie(serieId);
  if (!currentSerieDetails) {
    return <p className="text-gray-400">Loading...</p>;
  }
  return (
    <> 
      {console.log(currentSerieDetails)}
      <div className='max-h-full z-10 relative items-start justify-center flex flex-col'>
        <div className="pt-1 flex flex-col w-full text-[0.9rem] text-gray-300 max-w-full">
          <h2 className='items-start flex text-2xl font-semibold'>{currentSerieDetails?.name}</h2>
          <span className='items-start flex text-md'>{currentSerieDetails?.first_air_date}</span>
        </div>
        <p className='w-[300px] line-clamp-4 items-start text-start'>{currentSerieDetails?.overview}</p>
       <div className="flex flex-wrap items-center  gap-2 text-sm text-gray-300">
          <ul className='flex items-center gap-1 font-semibold'>Languages{(currentSerieDetails?.languages?.length > 0 ? currentSerieDetails.languages : currentSerieDetails?.origin_country || ['Loading...']).map((lang) => (
                  <span className='uppercase font-semibold' key={lang}>
              [{lang}]
            </span>
              ))
              }
        <p className='font-semibold'>Origin:</p>
            <span className='font-semibold'>{currentSerieDetails?.origin_country?.length > 0 ? (currentSerieDetails?.origin_country?.map(orig => (<span key={orig}>{orig}</span>))) : (
                <span  className='uppercase font-semibold text-[var(--colorAccent)]'>Loading...</span>
          )
        }</span>
          </ul>
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-300'>
        <p className='flex gap-2'>Seasons:<span className='font-semibold  max-w-14'>{currentSerieDetails?.number_of_seasons ? currentSerieDetails?.number_of_seasons : 'Loading...'}</span></p>
        <p className='flex gap-2'>Episodes:<span className='font-semibold  max-w-14'>{currentSerieDetails?.number_of_episodes ? currentSerieDetails?.number_of_episodes : 'Loading...'}</span></p>
          <p className='flex gap-2'>Status:<span className="font-semibold max-w-14 overflow-hidden whitespace-nowrap text-ellipsis">{currentSerieDetails?.status ? currentSerieDetails?.status : 'Loading...'}</span></p>
                      {currentSerieDetails?.genres?.map((gen, index) => (
            index <= 3 && (<li className="max-h-6 font-semibold rounded-sm max-w-full overflow-hidden"  key={gen.id}
              > {gen.name}</li>
            )
          ))}
        </div>
          </div>
    </>
  )
}
