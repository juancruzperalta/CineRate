import React from 'react'
import { SeriesPremier } from '../components/cardsComponents/SeriesPremier'

export const Premiere = () => {
  return (
    <div className='mt-20 flex flex-col'>

      <SeriesPremier cant={32} premiere={true} />
    </div>
  )
}
