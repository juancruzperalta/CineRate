
import { useDetailsSerie } from '../../../hooks/series/useDetailsSerie'
export const SerieCardDetails = ({ serieId }) => {
  const { currentSerieDetails } = useDetailsSerie(serieId);

  if (!currentSerieDetails) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div className='max-h-full z-10 relative text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] 2xl:text-[1rem]'>
      <div className="flex flex-col gap-2 text-gray-200">
           <div className="flex items-center gap-2">
           <span className="">{currentSerieDetails.number_of_seasons ?? '-'} seasons</span>
            <span className="">{currentSerieDetails.number_of_episodes ?? '-'} eps</span>
    
           </div>
        <div className="flex gap-1 ">
          {currentSerieDetails?.genres?.slice(0, 4).map((gen) => (
            <span
              key={gen.id}
              className=" text-ellipsis truncate px-2 py-0.5 rounded bg-[var(--colorAccent)] text-[#0B0F19]"
            >
              {gen.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
