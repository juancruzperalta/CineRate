import React, { useEffect, useRef, useState } from 'react'
import { getPopularsMovies } from '../../../api/tmdbMovie';
import { ButtonsScrollRef } from '../../helpers/buttonsScrollRef';
import { useNavigate } from 'react-router-dom';
import { MovieCardDetails } from './MovieCardDetails';

export const MoviesPopulars = () => {
  const [DetailsID, setDetailsID] = useState(null)
  const [movies, setMovieId] = useState([]);
  let leaveTimer;
  const navigate = useNavigate();
  const movieRef = useRef(null);
  
  function viewDetails(movieId) {
      setDetailsID(movieId);
  }
  
  useEffect(() => {
    getPopularsMovies().then(setMovieId);
  }, [])
  return (
     <>
    <div className='flex flex-row relative '>
        <ButtonsScrollRef serieRef={movieRef} reload={movies} />
        <div className='flex items-start justify-start gap-4 overflow-hidden scroll-smooth py-4 xl:max-w-[1200px] 2xl:max-w-[96vw] lg:max-w-[1000px] md:max-w-[700px] sm:max-w-[600px] max-w-[400px]' ref={movieRef}>

        {movies.map((movie) => (
            <div key={movie.id} className={`relative min-w-[200px] transition-all duration-500 overflow-hidden  ${  DetailsID === null  ? 'opacity-100' : movie.id === DetailsID ? 'opacity-100' : 'opacity-35'}`} onMouseEnter={() => { clearTimeout(leaveTimer), viewDetails(movie.id) }}  onMouseLeave={() => {leaveTimer = setTimeout(() => viewDetails(null), 200);}}>
              <img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.name} className='h-[300px] object-cover rounded-lg shadow-md cursor-pointer ' onClick={() => navigate(`/movies/details/${movie.id}`)} />
            <div
              className="absolute bottom-0 w-full bg-[var(--bgSecondary)]/90 flex flex-col items-center transition-all duration-300  rounded-b-lg py-2 px-2 border-t-1 border-gray-300/45 shadow-md max-w-full overflow-hidden whitespace-nowrap text-ellipsis"
                style={{display: '-webkit-box', WebkitLineClamp: movie.id === DetailsID ? 6 : 1, WebkitBoxOrient: 'vertical', maxHeight: movie.id === DetailsID ? '300px' : '50px', opacity: movie.id === DetailsID ? 1 : 0.9, }} >
              <span className="font-semibold py-1">{movie?.title}</span>

            <div className={`transition-all duration-500 ${  movie.id === DetailsID    ? 'opacity-100 translate-y-0 mt-2'    : 'opacity-0 -translate-y-3 h-0 overflow-hidden'  }`}  >
                {movie.id === DetailsID && (<MovieCardDetails movieId={movie.id} />)}</div>
             </div>
            </div>
            ))
          }
        </div>
    </div>
    </>
  )
}
