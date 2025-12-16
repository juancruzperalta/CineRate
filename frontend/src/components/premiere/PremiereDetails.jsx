
import { useDetailsSerie } from '../../hooks/useDetailsSerie'
export const PremiereDetails = ({serieId}) => {

  const { currentSerieDetails } = useDetailsSerie(serieId);
  if (!currentSerieDetails) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <> 
      {console.log(currentSerieDetails)}
      <div className='grid grid-cols-2 justify-center h-full items-center'>

      <div className='max-h-full h-full z-10 relative items-start justify-center flex flex-col'>
        <div className="pt-1 flex flex-col w-full text-[0.9rem] text-gray-300 max-w-full">
          <h2 className='items-start text-start flex text-2xl font-semibold'>{currentSerieDetails?.name}</h2>
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
          <div className='flex flex-col'>
        <div className='flex items-center gap-2 text-sm text-gray-300'>
        <p className='flex gap-2'>Seasons:<span className='font-semibold  max-w-14'>{currentSerieDetails?.number_of_seasons ? currentSerieDetails?.number_of_seasons : 'Loading...'}</span></p>
        <p className='flex gap-2'>Episodes:<span className='font-semibold  max-w-14'>{currentSerieDetails?.number_of_episodes ? currentSerieDetails?.number_of_episodes : 'Loading...'}</span></p>
          <p className='flex gap-2'>Status:<span className="font-semibold max-w-14 overflow-hidden whitespace-nowrap text-ellipsis">{currentSerieDetails?.status ? currentSerieDetails?.status : 'Loading...'}</span></p>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-300'>
              
              {currentSerieDetails?.genres?.map((gen, index) => (
                index <= 3 && (<li className="max-h-6 font-semibold rounded-sm max-w-full overflow-hidden"  key={gen.id}
                  > {gen.name}</li>
                )
              ))}
              </div>
          </div>
      </div>
        <div className='max-h-full h-full z-10 relative items-center justify-center flex flex-col '>


            <a className='cursor-pointer flex flex-col items-center justify-center hover:scale-[1.01] transition-all' href={currentSerieDetails?.homepage} target='_blank' rel='nopeener norefferer'><span><svg className={`w-12 h-12 ${currentSerieDetails?.homepage ? 'fill-blue-400' : 'fill-red-400' }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM252.3 211.1C244.7 215.3 240 223.4 240 232L240 408C240 416.7 244.7 424.7 252.3 428.9C259.9 433.1 269.1 433 276.6 428.4L420.6 340.4C427.7 336 432.1 328.3 432.1 319.9C432.1 311.5 427.7 303.8 420.6 299.4L276.6 211.4C269.2 206.9 259.9 206.7 252.3 210.9z" /></svg></span>          {currentSerieDetails?.homepage ? <span>Watch Serie</span>
          : <span>Fail to Load Link</span>}</a>
      </div>
                          </div>
    </>
  )
}
