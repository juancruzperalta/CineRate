import React from 'react'
import { useDetailsSerie } from '../../hooks/series/useDetailsSerie'
import { useNavigate } from 'react-router-dom';
import { useDetailsMovie } from '../../hooks/movies/useDetailsMovie';

export const WatchLaterSerieItem = ({ mediaId, value, onRemove, isRemoving = false }) => {
  const navigate = useNavigate();
  const serieDetails = useDetailsSerie(value ? mediaId : null);
  const currentMovieDetails = useDetailsMovie(!value ? mediaId : null);
  const currentDetails = value ? serieDetails?.currentSerieDetails : currentMovieDetails?.currentMovieDetails;
  return (
    <div className='relative group'>
      <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-[0_0_0_1px_rgb(var(--colorAccentRgb)_/_0.18),0_18px_55px_rgb(var(--colorAccentRgb)_/_0.05)]" />
      <img src={currentDetails?.backdrop_path ? `https://image.tmdb.org/t/p/w500${currentDetails?.backdrop_path}` : `https://image.tmdb.org/t/p/w500${currentDetails?.poster_path}`} alt={currentDetails?.name} className='h-[300px] w-[220px] object-cover rounded-lg shadow-md cursor-pointer overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]' onClick={() => {
        if (value) {
          navigate(`/series/details/${currentDetails?.id}`)
        }
          else{
          navigate(`/movies/details/${currentDetails?.id}`)
        }
      }}/>
      {onRemove ? (
        <button
          type="button"
          aria-label="Remove from watch later"
          title="Remove"
          disabled={isRemoving}
          className="absolute top-2 right-2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-black/55 border border-white/10 text-white hover:border-[var(--colorAccent)] hover:text-[var(--colorAccent)] hover:bg-black/70 transition disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M6.4 5l-.7-.7L5 5l.7.7L11.3 11.3 5.7 16.9 5 17.6l.7.7.7-.7L12 12.7l5.6 5.6.7.7.7-.7-.7-.7-5.6-5.6 5.6-5.6.7-.7-.7-.7-.7.7-5.6 5.6L6.4 5z" />
          </svg>
        </button>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-2 pt-10 bg-gradient-to-t from-black/85 via-black/35 to-transparent rounded-b-lg pointer-events-none">
        <div className="h-1 w-10 rounded-full bg-[var(--colorAccent)] mb-1" />
        <span className='block text-sm font-semibold truncate text-white'>
          {currentDetails?.name ? `${currentDetails?.name}` : `${currentDetails?.title}`}
        </span>
      </div>
    </div>
  )
}
