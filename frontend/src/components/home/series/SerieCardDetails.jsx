
import { useDetailsSerie } from '../../../hooks/series/useDetailsSerie'
export const SerieCardDetails = ({serieId}) => {

  const { currentSerieDetails } = useDetailsSerie(serieId);
  if (!currentSerieDetails) {
    return <p className="text-gray-400">Loading...</p>;
  }
  return (
    <> 
      
      <div className='max-h-full z-10 relative md:text-[0.8rem] lg:text-[0.9rem] text-[0.7rem]'>
        <div className="pt-1 flex flex-col w-full justify-between  text-gray-300   ">
          <span className='font-semibold p-0 m-0' >(
            {currentSerieDetails.first_air_date ? new Date(currentSerieDetails.first_air_date).getFullYear() : 'Loading...'})
                    </span>
              
          <ul className='flex items-center justify-center gap-1 '>{currentSerieDetails?.genres?.map((gen, index) => (
            index <= 3 && (<li className="bg-[var(--colorAccent)]  max-h-6 font-semibold p-[0.16rem] rounded-sm text-[#0B0F19]  max-w-full overflow-hidden"  key={gen.id}
              > {gen.name}</li>
            )
          ))}
        </ul>
       </div>
       <div className="hidden md:flex flex-wrap items-center justify-center gap-2 text-gray-300">
          <ul className='flex items-center justify-center gap-1 font-semibold'>Languages{(currentSerieDetails?.languages?.length > 0 ? currentSerieDetails.languages : currentSerieDetails?.origin_country || ['Loading...']).map((lang) => (
                  <span className='uppercase font-semibold text-[var(--colorAccent)]' key={lang}>
              [{lang}]
            </span>
              ))
              }
        <p className='font-semibold'>Origin:</p>
            <span className='font-semibold text-[var(--colorAccent)]'>{currentSerieDetails?.origin_country?.length > 0 ? (currentSerieDetails?.origin_country?.map(orig => (<span key={orig}>{orig}</span>))) : (
                <span  className='uppercase font-semibold text-[var(--colorAccent)]'>Loading...</span>
          )
        }</span>
          </ul>
        </div>
        <div className='flex items-center justify-center  gap-2 text-gray-300'>
        <p className='flex flex-col'>Seasons<span className='font-semibold text-[var(--colorAccent)] max-w-14'>{currentSerieDetails?.number_of_seasons ? currentSerieDetails?.number_of_seasons : 'Loading...'}</span></p>
        <p className='flex flex-col'>Episodes<span className='font-semibold text-[var(--colorAccent)] max-w-14'>{currentSerieDetails?.number_of_episodes ? currentSerieDetails?.number_of_episodes : 'Loading...'}</span></p>
        <p className='flex-col hidden md:flex'>Status<span className="font-semibold text-[var(--colorAccent)] max-w-14 overflow-hidden whitespace-nowrap text-ellipsis">{currentSerieDetails?.status ? currentSerieDetails?.status : 'Loading...'}</span></p>
        </div>
          </div>
    </>
  )
}
