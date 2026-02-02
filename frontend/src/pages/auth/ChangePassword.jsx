import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/helpers/AuthProvider';

export const ChangePassword = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  const [failToChange, setFailToChange] = useState("");
  useEffect(() => {
    if (!token) { navigate("/", { replace: true }) };
  }, [isLogged])
  const changePass = async (email, passwordAct, newPassword) => {
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
    }
  }
  const confirmPassword = ({ newPassword, confirmPassword }) =>{
    if (newPassword == confirmPassword) {
      if (token) {
        changePass(document.querySelector('#email').value, document.querySelector("#real-password").value, document.querySelector("#newPassword").value);
      }
    } else {
      console.log("New Password and confirm password is not matches");
      return;
    }
    
  }
  

  return (
 <div className='px-10 mt-12 w-full h-screen flex items-center justify-center'>
      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f]/80 rounded-sm shadow-sm shadow-gray-900 p-4 h-[460px] w-[340px] relative'>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="email" className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} placeholder='email' id="email" required />
        <input type="password" className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} placeholder='Real Password' id="real-password" required />
        <input type="password" className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} placeholder='new Password' id="newPassword" required />
        <input type="password" className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} placeholder='confirm password' id="confirmPassword" required/>
        <input type="button" value="Change Password" className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80'  placeholder='Renew Password' onClick={() => confirmPassword(document.querySelector("#newPassword"), document.querySelector("#confirmPassword"))}/>
        <span>{failToChange}</span>
      </form>
      </div>
  )
}
