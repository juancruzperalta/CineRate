import { useEffect, useState } from 'react';
import { ShowTrailer } from './ShowTrailer';

export const TrailerModal = ({trailerID}) => {
  const [closeTrailer, setCloseTrailer] = useState()

  useEffect(() => {
    setCloseTrailer(trailerID)
  }, [trailerID])
  function closeTrailerFunc() {
    setCloseTrailer(null)
  }
  return (
    <>
      {
        closeTrailer &&
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50" id="trailerContent" style={{ display: 'flex' }}>
          <div className="relative">
            <ShowTrailer serieId={closeTrailer} />
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
