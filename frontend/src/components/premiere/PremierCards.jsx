import {usePremierSerie} from '../../hooks/usePremierSerie'
export const PremierCards = () => {

  const { premiereSeries } = usePremierSerie();

  return (
    <div>
        {console.log(premiereSeries)}
        {
          premiereSeries?.map(serie => (
          <div key={serie.id}>
          <img key={serie.id} src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`} alt={serie.name} className='h-[300px] object-cover rounded-lg shadow-md cursor-pointer ' />
          </div>
          ))
        }
    </div>
  )
}
