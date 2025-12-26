import React from 'react'
import { useSearchParams } from 'react-router-dom';

export const SeriesDetails = ({serieId}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  setSearchParams({ details: serieId });

  const detailsId = searchParams.get("details");
  return (
    <div className='flex flex-col 2xl:max-w-[96vw] xl:max-w-[1200px] lg:max-w-[1000px]
    md:max-w-[700px] sm:max-w-[600px] max-w-[400px] h-dvh min-h-100vh w-full overflow-hidden'>
      <div className='max-w-full w-full h-full overflow-hidden mt-24 '>
        <p>
          
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, laudantium ipsa architecto, optio sapiente cupiditate, quis eaque iste alias ducimus laboriosam aperiam cum eligendi dolore? Consequuntur rerum aperiam commodi fugit! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit voluptate mollitia quae non accusantium illum, voluptatum blanditiis libero itaque beatae quasi corporis voluptatem, ratione aut reprehenderit eum sunt? Reiciendis, esse. {detailsId}
</p>
      </div>
      </div>
  )
}
