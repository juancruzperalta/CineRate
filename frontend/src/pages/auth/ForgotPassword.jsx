import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/helpers/AuthProvider';
import { useNavigate } from 'react-router-dom';
export const ForgotPassword = () => {
  const { isLogged } = useAuth();
  const [isCall, setIsCall] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if(isLogged)
    navigate("/", { replace: true })
  }, [isLogged])
  const forgotPassword = async () => {

      const res = await fetch(`http://localhost:8085/auth/forgot-password`, {
        method: "POST",
        headers: {
      "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
      })
    setIsCall(true);
    setTimeout(() => {
      setIsCall(false)
    }, 2000);
    if (!res.ok) {
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
        <input type="email" className={`w-full px-2 py-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} placeholder='Email' id="email" onChange={(e) => setEmail(e.target.value)} required/>
        <input type="button" value="Forgot password" className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80' placeholder='Forgot Password' onClick={() => forgotPassword()} />
        <span className={`${!isCall ? "hidden" : "flex"} absolute bottom-0`}>The confirmation has send to email</span>
      </form>
      </div>
  )
}
