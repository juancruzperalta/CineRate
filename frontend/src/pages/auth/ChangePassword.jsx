import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/helpers/AuthProvider';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  const [failToChange, setFailToChange] = useState("");
  useEffect(() => {
    if (!isLogged) { navigate("/", { replace: true }) };
  }, [isLogged])
  const changePass = async (email, passwordAct, newPassword) => {
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/change-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, passwordAct, newPassword })
      })
    const msg = await res.text();
    setFailToChange(msg);
    if (!res.ok) {
      setFailToChange(msg);
                  setTimeout(() => {
              setFailToChange('');
            }, 3000);
        return;
    } else { 
                        setTimeout(() => {
              navigate("/user/account", { replace: true })
            }, 3000);
    }
  }
  const confirmPassword = ({ newPassword, confirmPassword }) =>{
    if (newPassword == confirmPassword) {
      if (isLogged) {
        changePass(document.querySelector('#email').value, document.querySelector("#real-password").value, document.querySelector("#newPassword").value);
      }
    } else {
      console.log("New Password and confirm password is not matches");
      return;
    }
    
  }


  return (
    <div className='px-10  bg-[radial-gradient(circle,_rgba(14,211,149,0.15)_5%,_rgba(12,61,47,0.35)_15%,_rgba(0,0,0,1)_100%)] w-full min-h-screen flex flex-col items-center justify-center'>
      <div className='flex items-center flex-col justify-center gap-2 mb-6'>
        <span className="text-2xl font-bold tracking-wide flex items-center justify-center">
          <img src="/logoSinFondo.png" alt="Cine Rate" className='w-12 h-12' />
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
        </span>
        <span className='text-sm font-semibold text-gray-300'>Update your password to keep your account secure</span>
      </div>

      <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl shadow-2xl shadow-black/40 mt-4'>
        <div className='px-6 pt-4 flex flex-col'>
          <span className=' text-md uppercase font-semibold'>CHANGE PASSWORD</span>
        </div>
        <form action="" className='flex items-center justify-center flex-col gap-3 rounded-xl py-8 px-6 h-full w-full md:min-w-[340px] relative '>
          <input type="email" className={`w-full 
          px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} placeholder='Email' id="email" required />
          <input type="password" className={`w-full 
          px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} placeholder='Current password' id="real-password" required />
          <input type="password" className={`w-full 
          px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} placeholder='New password' id="newPassword" required />
          <input type="password" className={`w-full 
          px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} placeholder='Confirm new password' id="confirmPassword" required />
          <input type="button" value="Change password" className={`w-full cursor-pointer 
          px-3 py-2 rounded-2xl bg-white/90 text-black placeholder:text-gray-300/50 outline-none  transition`} placeholder='Renew Password' onClick={() => confirmPassword(document.querySelector("#newPassword"), document.querySelector("#confirmPassword"))} />
          <span className='text-sm text-gray-200'>{failToChange}</span>
        </form>
      </div>
    </div>
  )
}
