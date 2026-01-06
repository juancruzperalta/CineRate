
import { usePremiereMovies } from '../../../hooks/movies/usePremiereMovies';
import { Link } from '../../common/Link'
import { useNavigate } from 'react-router-dom';

export const MoviesPremier = ({cant}) => {
    const navigate = useNavigate();
  const { premiereMovies } = usePremiereMovies();
  return (
    <>
      <div className='flex flex-col items-center justify-center overflow-hidden relative w-full h-full gap-4 mt-4'>
        <div className='gap-2 h-full grid  w-full  grid-cols-9 grid-rows-1 items-center justify-between' style={{gridTemplateColumns: `repeat(${cant}, minmax(0, 1fr))`}}>

      {premiereMovies?.results.slice(0,cant).map(movie => (
        <div key={movie?.id} className='flex h-full flex-col w-full items-center justify-center'>
          <img src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path}`} alt={`Error to load movie image: ${movie?.name}`} className='min-h-[180px] max-h-[180px] min-w-[120px] max-w-[120px] object-cover rounded-lg shadow-md cursor-pointer  hover:opacity-80' onClick={() => navigate(`/movies/details/${movie?.id}`)}/>
          <span className='max-w-[100px] whitespace-nowrap text-ellipsis line-clamp-1  text-gray-200 font-bold'>{movie?.name}</span>
        </div>
      ))}
      </div>
        <div className='h-20'>
          <Link to="/movies/premiere" className='border-1 border-gray-500 rounded-md py-1 px-6 cursor-pointer  hover:border-gray-700 hover:bg-[var(--bgSecondary)'>
            More Premiere Movies
          </Link>
        </div>
      </div>
    </>
  )
}
