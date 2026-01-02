import React, { useEffect, useState } from 'react'
import { useSearch } from '../hooks/useSearch'
import { SeriesMoviesCards } from '../components/SerieOrMovieCards/SeriesMoviesCards';
import { useSearchParams } from 'react-router-dom';

export const Search = () => {
    const [pageAct, setPageAct] = useSearchParams();
  const [querySearch, setQuerySearch] = useState(null)
  let value = null;
  function FuncQuerySearch(values) { 
    if (!values) return;
    value = values;
    setPageAct({
        query: value,
      });
    setQuerySearch(value);
  }
  const page = pageAct.get("query");
  useEffect(() => {
    if(value != null)
      setPageAct({ pageAct: value });
  }, [page])
  
  const query = useSearch(querySearch);
  return (
 <div className='flex flex-col 2xl:max-w-[96vw] xl:max-w-[1200px] lg:max-w-[1000px]
    md:max-w-[700px] sm:max-w-[600px] max-w-[400px] mb-4 h-full min-h-100vh w-full overflow-hidden'>
      <div className='flex items-center justify-center mt-24 w-full h-full mb-4'>
        <div className='w-[600px] h-full flex items-center justify-center bg-gray-800/40  border border-gray-300 rounded-sm overflow-hidden '>
          
        <input className='w-full h-[20px] px-2 bg-transparent outline-none text-white placeholder-gray-400' type="search" placeholder='Search movie or serie' id='inputSearch'/>
        <button className="h-[40px] px-2 flex items-center justify-center hover:bg-gray-700 transition" onClick={() => FuncQuerySearch(document.querySelector("#inputSearch").value)}>
      <svg
        className="w-5 h-5 fill-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        >
        <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
      </svg>
    </button>
        </div>
        </div>
        <SeriesMoviesCards seriesOrMovie={query?.QuerySearch?.results} />
    </div>
  )
}
