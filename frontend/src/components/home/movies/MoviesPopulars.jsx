import React, { useEffect, useRef, useState } from 'react'
import { getPopularsMovies } from '../../../api/tmdbMovie';
import { ButtonsScrollRef } from '../../helpers/ButtonsScrollRef';
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
    const [isMobile, setIsMobile] = useState(() => {
      return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    });
  useEffect(() => {
    getPopularsMovies().then(setMovieId);
  }, [])
    useEffect(() => {
      const onResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, []);
  return (
     <>
    <div className='flex flex-row relative group'>
        <ButtonsScrollRef serieRef={movieRef} reload={movies} />
        <div className='flex items-start justify-start gap-4 overflow-hidden scroll-smooth py-4 w-full snap-x snap-mandatory' ref={movieRef}>

        {movies.map((movie) => (
            <div
              key={movie.id}
              className={`relative min-w-[120px] md:min-w-[160px] lg:min-w-[200px] hover:scale-105 snap-start transition-all duration-500 overflow-hidden group shadow-lg hover:shadow-2xl ring-1 ring-black/30 rounded-lg ${
                DetailsID === null
                  ? 'opacity-100'
                  : movie.id === DetailsID
                  ? 'opacity-100'
                  : 'opacity-30'
              }`}
              onMouseEnter={() => {
                clearTimeout(leaveTimer);
                viewDetails(movie.id);
              }}
              onMouseLeave={() => {
                leaveTimer = setTimeout(() => viewDetails(null), 200);
              }}
            >
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.name}
                className='h-[200px] md:h-[240px] lg:h-[300px] object-cover rounded-lg cursor-pointer transition-transform duration-500 group-hover:scale-105'
                onClick={() => navigate(`/movies/details/${movie.id}`)}
              />
                  {isMobile && (
                    <div className='absolute bottom-0 inset-0 flex  items-end text-white'>
                    <span className='font-semibold text-center bg-black/50 w-full p-1  md:text-lg text-sm line-clamp-1'>{movie?.title}</span>
                    </div>
                  )}
              <div
                className={`absolute inset-0 bg-gradient-to-t hover:scale-105 from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                  movie.id === DetailsID ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className='absolute inset-0'></div>
                <div className='absolute inset-0 bg-black/80 flex flex-col md:justify-end justify-center p-3 text-white'>
                  <div className='flex flex-col gap-2 max-h-[100%] lg:max-h-[80%] overflow-y-hidden'>
                    <div className='flex flex-row items-center pb-2 justify-between border-b border-white/10'>
                      <span className='font-semibold text-start md:text-lg text-sm line-clamp-1'>{movie?.title}</span>
                      <span className='text-sm bg-yellow-500 text-black md:px-2 md:py-1 px-1 py-0 rounded'>
                        {movie.vote_average?.toFixed(1) ?? 'N/A'}
                      </span>
                    </div>
                    <div className='flex items-center justify-start gap-2 text-xs md:text-[1rem] font-semibold text-gray-200'>
                      {movie.release_date ? (
                        <span className='bg-[var(--colorAccent)] text-[#0B0F19] p-[2px] text-xs md:text-[.9rem] rounded-sm'>{new Date(movie.release_date).getFullYear()}</span>
                      ) : null}
                      {movie.original_language ? <span className='bg-[var(--colorAccent)] text-[#0B0F19] p-[2px] text-xs md:text-[.9rem] rounded-sm'>{movie.original_language.toUpperCase()}</span> : null}
                    </div>
                    <div className='text-xs md:text-[1rem] text-white/80'>
                      {movie.id === DetailsID && <MovieCardDetails movieId={movie.id} />}
                    </div>
                    <div className='flex gap-2 mt-2'>
                      <button
                        className='flex-1 px-2 py-1 cursor-pointer text-[.8rem] md:text-[.9rem] font-semibold uppercase bg-white/20 text-white rounded hover:bg-white/30 transition'
                        onClick={() => navigate(`/movies/details/${movie.id}`)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}
