import { Skeleton } from '../helpers/Skeleton';
import { useTrailerSerie } from '../../hooks/series/useTrailerSerie';

export const ShowTrailerSerie = ({ serieId }) => {
  const { trailerKey } = useTrailerSerie(serieId);

  const baseStyles = 'w-full h-full flex items-center justify-center relative';
  const messageStyles = 'text-center text-lg uppercase font-semibold text-gray-200';

  if (trailerKey === undefined) {
    return (
      <div className={baseStyles}>
        <div className='flex flex-col items-center gap-3'>
          <Skeleton w={80} h={80} />
          <span className={messageStyles}>Loading trailer...</span>
        </div>
      </div>
    );
  }

  if (trailerKey === null) {
    return (
      <div className={baseStyles}>
        <div className='flex flex-col items-center gap-3'>
          <Skeleton w={200} h={200} error={true} />
          <span className={messageStyles}>Trailer not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={baseStyles}>
      <div className='relative w-full max-w-[960px] aspect-video rounded-xl overflow-hidden shadow-xl bg-black'>
        <iframe
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title='Trailer'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          id='iframeVideo'
          allowFullScreen
          className='w-full h-full'
        ></iframe>
      </div>
    </div>
  );
};
