import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <div className='px-10 mt-12 w-full h-screen flex items-center justify-center'>
      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f]/80 rounded-sm shadow-sm shadow-gray-900 p-4 h-[460px] w-[340px] relative'>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="email" placeholder='email' className='w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm'/>
        <input type="password" placeholder='password' className='w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm' />
        <input type="button" value="login" placeholder='Login' className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem]' />
        <span>¿You don't a account? <Link to="/accounts/register" className='text-[#0ed395] font-semibold cursor-pointer'>Register</Link></span>
      </form>
      </div>
  )
}
