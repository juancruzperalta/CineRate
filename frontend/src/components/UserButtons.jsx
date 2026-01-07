import React, { useState } from 'react'
export const UserButtons = ({serieId}) => {
  const [favorite, setFavorite] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  return (
    <div className='flex lg:absolute mt-4 mb-2 lg:mt-0 bottom-1 z-10 items-center justify-center lg:justify-start gap-4 w-full'>
      <span onMouseEnter={() => setFavorite(true)} onMouseLeave={() => setFavorite(false)} className={`flex items-center justify-start w-[140px] cursor-pointer`}>
        <svg className={`w-6 h-6 cursor-pointer ${favorite ? 'fill-red-400' : 'fill-gray-700'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>
        Add to favorite
      </span>
      <span onMouseEnter={() => setWatchLater(true)} onMouseLeave={() => setWatchLater(false)}  className='flex items-center justify-start  w-[140px] cursor-pointer'>
        <svg className={`w-6 h-6 cursor-pointer ${watchLater ? 'fill-gray-300' : 'fill-gray-700'}`}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" /></svg>
        Watch later
      </span>
    </div>
  )
}
