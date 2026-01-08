import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className='px-10 w-full h-screen flex items-center justify-center'>
      <div className='flex flex-col'>
      <span className='text-[74px] font-bold text-red-500'>
        404
      </span>
      <span className='text-3xl font-semibold'>  
      PAGE NOT FOUND
        </span>

      <Link to="/" className="cursor-pointer mt-8 bg-gray-600/60 p-2 rounded-sm">
          <span className="text-2xl font-bold tracking-wide">
            <span>HOME</span>
          </span>
        </Link>
      </div>
    </div>
  )
}
