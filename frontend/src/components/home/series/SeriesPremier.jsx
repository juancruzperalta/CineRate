
import { useEffect, useState } from 'react';
import { usePremierSerie } from '../../../hooks/series/usePremierSerie';
import { getDetailsOfSerie } from '../../../api/tmdbSerie';
import { Link } from '../../common/Link'
import { useNavigate } from 'react-router-dom';

export const SeriesPremier = ({ cant }) => {
  const navigate = useNavigate();
  const { premiereSeries } = usePremierSerie();
  const [serieDetails, setSerieDetails] = useState({});

  useEffect(() => {
    if (!premiereSeries || premiereSeries.length === 0) return;

    const ids = premiereSeries.slice(0, cant).map((serie) => serie.id);

    Promise.all(
      ids.map((id) =>
        getDetailsOfSerie(id).catch(() => null)
      )
    ).then((results) => {
      const detailsById = {};
      results.forEach((detail, idx) => {
        if (detail) {
          detailsById[ids[idx]] = detail;
        }
      });
      setSerieDetails(detailsById);
    });
  }, [premiereSeries, cant]);
      const seriesWithImages = premiereSeries?.filter(
        (serie) => serie?.backdrop_path || serie?.poster_path
      );
  return (
    <>
      <div className='flex flex-col items-center justify-center overflow-hidden relative w-full h-full gap-4 mt-4'>
        <div
          className={`gap-2 h-full grid  w-full  grid-rows-1 items-center justify-between`}
          style={{
            gridTemplateColumns: `repeat(${cant}, minmax(0, 1fr))`
          }}>
      {seriesWithImages?.slice(0, cant).map((serie) => {
        const details = serieDetails?.[serie?.id];
        const seasons = details?.number_of_seasons;
        const episodes = details?.number_of_episodes;
      const imagePath = serie?.backdrop_path || serie?.poster_path;
        const infoText = [];
        if (seasons !== undefined) infoText.push(`${seasons} temporada${seasons === 1 ? '' : 's'}`);
        if (episodes !== undefined) infoText.push(`${episodes} capítulo${episodes === 1 ? '' : 's'}`);
        if (serie?.first_air_date) {
          const year = new Date(serie.first_air_date).getFullYear();
          infoText.push(`${year}`);
        }
        if(!imagePath) return null;
        return (
          <div key={serie?.id} className='flex h-full flex-col w-full items-center justify-center '>
            <img
              src={`https://image.tmdb.org/t/p/w500${imagePath}`}
              alt={`${serie?.name}`}
              className='max-w-full min-w-full object-cover rounded-lg shadow-md cursor-pointer  hover:opacity-80'
              onClick={() => navigate(`/series/details/${serie?.id}`)}
            />
            <span className='max-w-full whitespace-nowrap text-ellipsis line-clamp-1  text-gray-200 font-bold'>
              {serie?.name}
            </span>
            <span className='max-w-full whitespace-nowrap text-ellipsis text-xs text-gray-400'>
              {infoText.length > 0 ? infoText.join(' · ') : 'Loading...'}
            </span>
          </div>  
        )})}
      </div>
        <div className='h-20'>
          <Link to="/series/premiere" className='border-1 border-gray-500 rounded-md py-1 px-6 cursor-pointer  hover:border-gray-700 hover:bg-[var(--bgSecondary)]'>
            More Premiere Series
          </Link>
        </div>
      </div>
    </>
  )
}
