import { useEffect, useState } from 'react';
import { ShowTrailerSerie } from './ShowTrailerSerie';
import { useSearchParams } from 'react-router-dom';

export const TrailerModalSerie = ({trailerID}) => {
  const [closeTrailer, setCloseTrailer] = useState()
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setCloseTrailer(trailerID)
    setSearchParams({trailer : trailerID})
  }, [trailerID])
  function closeTrailerFunc() {
    setCloseTrailer(null)
    setSearchParams({});
  }
  const searchTrailerID = searchParams.get("trailer") || null;
  
  return (
    <>
      {closeTrailer && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/80 backdrop-blur-sm'
            onClick={closeTrailerFunc}
          />
          <div className='relative z-10 w-full max-w-[960px] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-[#0b0f19]/90'>
            <button
              className='absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--colorAccent)] text-white shadow-lg transition hover:bg-[var(--buttomActive)]'
              onClick={closeTrailerFunc}
              aria-label='Close trailer'
            >
              ✕
            </button>
            <div className='w-full h-full p-4 overflow-auto'>
              <ShowTrailerSerie serieId={searchTrailerID} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
