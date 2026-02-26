import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetForgotPassword = () => {
//obtengo el token que envian por url el usuario. 
  const tokenTemp = new URLSearchParams(window.location.search).get("token");
  const [passwordChange, setPasswordChange] = useState("");
  const navigate = useNavigate();
  const resetForgotPassword = async (password, confirmPassword) => {
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/reset-forgot-password`, {
        method: "POST",
        headers: {
      "Content-Type": "application/json"
        },
        body: JSON.stringify({tokenTemp,password,confirmPassword})
      })
          const msg = await res.text();
          if (!res.ok) {
            setPasswordChange(msg);
              return;
          }
    if (res.ok) {
      setPasswordChange(msg);
      setTimeout(() => {
        navigate("/auth", { replace: true })
        setPasswordChange("")
      }, 2000);
    }
  }

  return (
        <div className='px-10 bg-[radial-gradient(circle,_rgba(14,211,149,0.15)_5%,_rgba(12,61,47,0.35)_15%,_rgba(0,0,0,1)_100%)] w-full min-h-screen flex flex-col items-center justify-center'>
            <form action="" className='flex items-center justify-center flex-col gap-3 rounded-xl py-8 px-6 h-full w-full md:min-w-[340px] relative '>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="password" className={`w-full 
      px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} placeholder='password' id="password" required />
        <input type="password" className={`w-full 
      px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} placeholder='confirmPassword' id="confirmPassword" required />
        <input type="button" value="Reset password" className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80' placeholder='Forgot Password' onClick={() => resetForgotPassword(document.querySelector("#password").value, document.querySelector("#confirmPassword").value)} />
        <span className={`absolute bottom-0`}>{passwordChange}</span>
      </form>
      </div>
  )
}
