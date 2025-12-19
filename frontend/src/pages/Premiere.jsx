import React from 'react'
import { PremierCards } from '../components/premiere/PremierCards.jsx'
import { useSearchParams } from 'react-router-dom';
import { usePremierSerie } from '../hooks/usePremierSerie.jsx';
const IMAGES_PER_PAGE = 10;

export const Premiere = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const start = (page - 1) * IMAGES_PER_PAGE;
const end = start + IMAGES_PER_PAGE;
  const { premiereSeries } = usePremierSerie();
const imagesToShow = premiereSeries.slice(start, end);
  return (
    <>
      <div className='mt-24 flex flex-col 2xl:max-w-[96vw] xl:max-w-[1200px] lg:max-w-[1000px]
    md:max-w-[700px] sm:max-w-[600px] max-w-[400px] w-full overflow-hidden'>
        <div className='max-w-full w-full overflow-hidden'>
          <h1 className=' text-white text-4xl font-semibold tracking-tight mb-3'>Premiere Series</h1>
<div className="  pt-4  mb-10">
            <p className='    text-gray-200 text-lg leading-relaxed'>Explore upcoming series premieres and be the first to watch what’s coming next this week.</p>

          </div>
<p className="mt-2 text-[0.9rem]  uppercase tracking-widest text-white/55">
  This week premieres
</p>
         <div className="mx-auto mt-2 mb-2 h-px w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent" />

          <PremierCards premiereSeries={imagesToShow} />
        </div>
        <button onClick={setSearchParams(page+1)}>Pagina</button>
    </div>
    </>
  )
}
