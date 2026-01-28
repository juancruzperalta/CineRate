import React from 'react'
import { useState } from 'react';

export const ResetForgotPassword = () => {
//obtengo el token que envian por url el usuario. 
  const tokenTemp = new URLSearchParams(window.location.search).get("token");
  const [passwordChange, setPasswordChange] = useState(false);
  const resetForgotPassword = async (password, confirmPassword) => {
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/reset-forgot-password`, {
        method: "POST",
        headers: {
      "Content-Type": "application/json"
        },
        body: JSON.stringify({tokenTemp,password,confirmPassword})
      })
    if (res.ok)
    setPasswordChange(true);
      setTimeout(() => {
      setPasswordChange(false)
    }, 2000);
    if (!res.ok) {
      setPasswordChange(false);
        return;
    }
  }

  return (
 <div className='px-10 mt-12 w-full h-screen flex items-center justify-center'>
      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f]/80 rounded-sm shadow-sm shadow-gray-900 px-8 py-2 h-[240px] w-[400px] relative'>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="password" className={`w-full px-2 mt-4 py-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} placeholder='password' id="password" required />
        <input type="password" className={`w-full px-2 py-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} placeholder='confirmPassword' id="confirmPassword" required />
        <input type="button" value="Reset password" className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80' placeholder='Forgot Password' onClick={() => resetForgotPassword(document.querySelector("#password").value, document.querySelector("#confirmPassword").value)} />
        <span className={`${!passwordChange ? 'hidden' : 'flex'} absolute bottom-0`}>Password has been change</span>
      </form>
      </div>
  )
}
