import { useEffect, useState } from 'react';
import SeriesGrid from '../components/home/series/SeriesGrid';
import { useDetailsSerie } from '../hooks/series/useDetailsSerie';
import { useGetAiringTodaySerie } from '../hooks/series/useGetAiringTodaySerie';
import { TrailerModalSerie } from '../components/trailer/trailerModalSerie';
import { useNavigate } from 'react-router-dom';
import { MoviesGrid } from '../components/home/movies/MoviesGrid';

export const Home = () => {
  const {currentSerie} = useGetAiringTodaySerie();
  const [showTrailerID, setShowTrailer] = useState(null)
  const serieOne = currentSerie?.results?.[0]; 
  const { currentSerieDetails } = useDetailsSerie(serieOne?.id);
  const [isLoading, setIsLoading] = useState(true);
  
  const [heroImage, setHeroImage] = useState(null);
  
useEffect(() => {
  const update = () => {
    const isPortrait = window.innerWidth < window.innerHeight;

    setHeroImage(
      isPortrait
        ? serieOne?.poster_path
        : serieOne?.backdrop_path
    );
  };

  update();
  window.addEventListener("resize", update);

  return () => window.removeEventListener("resize", update);
}, [serieOne]); 
  
  const navigate = useNavigate();
  useEffect(() => {
    if (currentSerie)
      //si no viene la serie, la posiciono como "cargando"
      setIsLoading(false);
  }, [currentSerie])
  if (isLoading) {
    return (
    <>
<div className="relative flex items-center justify-center w-full h-[100vh] overflow-hidden p-0 m-0   mb-6 bg-[#090c0f]">
        <div className="text-left text-[0.9rem]  z-20 text-gray-200  absolute  left-0 top-auto   mt-auto mb-auto gap-2 flex flex-col  h-full justify-end bottom-3 xl:max-w-[1200px]  2xl:max-w-[96vw] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px]  mx-auto pb-3  inset-0 ">
          
        <div className="flex flex-col gap-3 text-gray-300 ">
        
      <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-8 w-60 bg-gray-700 rounded animate-pulse"></div>
      <div className="flex gap-2">
      <div className="h-6 w-10 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-6 w-10 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-6 w-10 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-6 w-10 bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="h-40 w-[400px] bg-gray-700/50 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
              
                  </div>
    </div>
        </div>
      </div>
    <main className="xl:max-w-[1200px] 2xl:max-w-[96vw] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px] " >
      <div className='justify-center items-center flex flex-col'>
      <section className='w-full mb-8'>
        <div className='text-start relative'>
          <span className='h-4 w-30 bg-gray-700 rounded animate-pulse'></span>
          <span className='h-4 w-30 bg-gray-700 rounded animate-pulse'></span>
              </div>
          <div className='relative flex gap-6 min-w-[200px] transition-all duration-500 overflow-hidden'>
              <div className="h-54 w-44 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-54 w-44 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-54 w-44 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-54 w-44 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-54 w-44 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-54 w-44 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-54 w-44 bg-gray-700 rounded animate-pulse"></div>

          </div>
            </section>
            </div>
            </main>
    </>
  );
}

  function showTrailerFunc() {
    setShowTrailer(serieOne.id)
    //paso al usestate, la id con el trailer para buscar sobre esa id.
  }

  return (
    <>
          <div className='relative heroRight heroLeft  flex items-center justify-center w-full  h-svh overflow-hidden p-0 m-0  backdrop-brightness-[30%] mb-6 '>
        <img className="object-cover object-center opacity-55 absolute top-0 left-0 w-full h-full overflow-hidden object-top" src={`https://image.tmdb.org/t/p/original/${heroImage}`} alt={serieOne?.name} />
        
        <div className="text-left text-[0.9rem]  z-20 text-gray-200  absolute  left-0 top-auto   mt-auto mb-auto gap-2 flex flex-col  h-full justify-end bottom-3 w-full px-6  mx-auto pb-3  inset-0 ">
          <h2 className='text-md font-semibold uppercase text-[#0ed395]'>On Air Today</h2>
          <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-white leading-tight'>
            {serieOne?.name}</h3>
          <div className='flex flex-wrap items-center gap-3 text-sm'>
            <span className='font-semibold text-black bg-yellow-500 text-[1rem]  p-0 m-0 pt-0 pb-0 rounded-sm'>{serieOne?.vote_average?.toFixed(1) ? <span className='border-1 border-gray-300 bg-yellow-500  p-[0.2rem] m-0 pt-0 pb-0 rounded-sm'>{serieOne?.vote_average?.toFixed(1) }</span> :  (
             <span className='bg-yellow-300/70 rounded w-[36px] h-[1rem] inline-block animate-pulse'></span>
            )}</span>
            <span className='font-semibold text-[var(--textSecondary)]/95 text-[1rem]  p-0 m-0 pt-0 pb-0 rounded-sm'>{serieOne?.first_air_date ? <span className='border-1 border-gray-300  p-[0.2rem] m-0 pt-0 pb-0 rounded-sm'>{new Date(serieOne?.first_air_date).getFullYear()}</span> :  (
              <span className='bg-gray-500/20 rounded w-[30px] h-[1rem] inline-block animate-pulse'></span>
            )}</span>
            <span className='font-semibold text-[var(--textSecondary)]/95 text-[1rem] p-0 m-0 pt-0 pb-0 rounded-sm'>{serieOne?.origin_country?.[0] ? <span className='border-1 border-gray-300   p-[0.2rem] m-0 pt-0 pb-0 rounded-sm'>{serieOne?.origin_country?.[0]}</span>:  (
              <span className='bg-gray-500/20 rounded w-[30px] h-[1rem] inline-block animate-pulse'></span>
            )}</span>
            <span className='font-semibold text-[var(--textSecondary)]/95 text-[1rem] p-0 m-0 pt-0 pb-0 rounded-sm'>{currentSerieDetails?.number_of_seasons ? <span className=' border-1 border-gray-300   p-[0.2rem] m-0 pt-0 pb-0 rounded-sm'>{currentSerieDetails?.number_of_seasons + ' Seasons'}</span> :  (
               <span className='bg-gray-500/20 rounded w-[30px] h-[1rem] inline-block animate-pulse'></span>
              )}
              </span>
            </div>
          <p className=' text-[1rem] text-[var(--textSecondary)]  line-clamp-7 max-w-[360px]'>{serieOne?.overview ? serieOne?.overview  :
            <span className='bg-gray-500/20 rounded p-1 inline-block animate-pulse'>Loading...</span>}</p>
          <div className='flex flex-col items-start mt-3 font-semibold text-[var(--textSecondary)]'>
            <span>
            {currentSerieDetails?.created_by?.map((author, index) => (
              <span key={author.id}>
                {index > 0 && ", "} {author.name}
              </span>
            ))}
            </span>
            <span>
             {currentSerieDetails?.genres?.map((genres, index) =>  (
               <span key={genres.id}>
                {index > 0 && ", "} {genres.name}
              </span>
            ))}
            </span>
          </div>
          <div className='gap-4 flex flex-row items-center'>
            <button className='p-2 bg-white text-gray-900 uppercase hover:bg-gray-300 cursor-pointer' onClick={() => showTrailerFunc(serieOne)}>View Trailer</button>
            <button className='p-2 text-white bg-gray-300/40 uppercase hover:bg-gray-700/60 cursor-pointer  backdrop-blur-md' onClick={() => navigate(`/series/details/${serieOne.id}`)}>More Information</button>
          </div>
          {showTrailerID && <TrailerModalSerie trailerID={showTrailerID} />}
        {/* le pido al componente trailer modal, que me busque por esa trailer id. */}
       </div>
    </div>
       <main className=" w-full px-6  ">
        <SeriesGrid />

        <MoviesGrid/>
        </main> 

      </>
  )
}