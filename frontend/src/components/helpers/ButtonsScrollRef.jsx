import React, { useEffect, useState } from 'react'

export const ButtonsScrollRef = ({ serieRef, reload }) => {
  const [ShowButtons, setShowButtons] = useState(false);
    useEffect(() => {
    const el = serieRef.current;
    if (!el) return;
  
    const checkOverflow = () => {
      setShowButtons(el.scrollWidth > el.clientWidth);
    };
  
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
  
    return () => window.removeEventListener('resize', checkOverflow);
    }, [reload]);
  
  const scrollButton = (value) => {
    serieRef.current.scrollBy({left: value, behavior: 'smooth'})
  }
  return (
  <>
      
      {ShowButtons &&(
            <button
              className="absolute left-0.5 top-1/2 -translate-y-1/2 z-10 bg-black/90 text-white rounded-sm p-2 hover:bg-black"
              onClick={() => scrollButton(-1000)}>
              <svg className='w-8 h-8 fill-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z" /></svg></button>)}
          {ShowButtons &&(
 <button
          className="absolute right-0.5 top-1/2 -translate-y-1/2 z-10 bg-black/90 text-white rounded-sm p-2 hover:bg-black" 
          onClick={() => scrollButton(1000)}
      ><svg className='w-8 h-8 fill-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M149 100.8C161.9 93.8 177.7 94.5 190 102.6L448 272.1L448 128C448 110.3 462.3 96 480 96C497.7 96 512 110.3 512 128L512 512C512 529.7 497.7 544 480 544C462.3 544 448 529.7 448 512L448 367.9L190 537.5C177.7 545.6 162 546.3 149 539.3C136 532.3 128 518.7 128 504L128 136C128 121.3 136.1 107.8 149 100.8z"/></svg>
          </button>)
      }
      </>
  )
}
