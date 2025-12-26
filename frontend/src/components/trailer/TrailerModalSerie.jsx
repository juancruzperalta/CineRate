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
      {
        closeTrailer &&
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50" id="trailerContent" style={{ display: 'flex' }}>
          <div className="relative">
            <ShowTrailerSerie serieId={searchTrailerID} />
            <button
              className="absolute cursor-pointer bottom-0 right-0 bg-[var(--colorAccent)] hover:bg-[var(--buttomActive)] h-10 w-10 rounded-full text-white"
              onClick={() => closeTrailerFunc()}
            >
              X
            </button>
          </div>
        </div>
      }
    </>
  )
}
