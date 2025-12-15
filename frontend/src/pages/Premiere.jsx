import React from 'react'
import { PremierCards } from '../components/premiere/PremierCards.jsx'


export const Premiere = () => {
  return (
    <>
      <div className='mt-20 flex flex-col'>
        <div className='max-w-full'>
          <h1>Estrenos</h1>
          <p className='max-w-[900px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis minima nemo asperiores. Soluta, temporibus. Rem, quidem, necessitatibus labore dolor, quos quae doloribus impedit odio praesentium a esse dolores voluptate magni!</p>
          <PremierCards/>
        </div>
    </div>
    </>
  )
}
