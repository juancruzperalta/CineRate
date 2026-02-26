import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/helpers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { SvgLoading } from '../../assets/icons/SvgLoading';
export const ForgotPassword = () => {
  const { isLogged } = useAuth();
  const [isCall, setIsCall] = useState('');
  const [blockedButton, setBlockedButton] = useState(false);
  const [email, setEmail] = useState("");
  const [forgotRateLimit, setForgotRateLimit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const BLOCK_TIME = 15 * 60 * 1000;
    const until = Date.now() + BLOCK_TIME;
  const navigate = useNavigate();
  useEffect(() => {
    if(isLogged)
    navigate("/", { replace: true })
  }, [isLogged])
  useEffect(() => {
    if (forgotRateLimit) {
      localStorage.setItem("FORGOT_LIMIT", until.toString());
      setBlockedButton(true);
      setTimeout(() => {
        localStorage.removeItem("FORGOT_LIMIT");
        setBlockedButton(false);
      },BLOCK_TIME);
    }
  }, [forgotRateLimit])
  
  useEffect(() => {
    const block = localStorage.getItem("FORGOT_LIMIT")
    if (block && Date.now() < Number(block)) {
      setBlockedButton(true);
      const timeOut =Number(block)-Date.now();
      setTimeout(() => {
        localStorage.removeItem("FORGOT_LIMIT");
        setBlockedButton(false);
      }, timeOut);
    }
  }, [])
  
  const forgotPassword = async () => {
    setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
    if (email == "") return;
    
    const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
      })
    const msg = await res.text();
    if (msg.includes("wait a few minutes")) {
      setForgotRateLimit(true);
    }
      setIsCall(msg);
      setTimeout(() => {
        setIsCall('')
      }, 2000);
    if (!res.ok) {
        return;
    }
  }
  return (
      <div className='px-10  bg-[radial-gradient(circle,_rgba(14,211,149,0.15)_5%,_rgba(12,61,47,0.35)_15%,_rgba(0,0,0,1)_100%)] w-full min-h-screen flex flex-col items-center justify-center'>
         <div className='flex items-center flex-col justify-center gap-2 mb-6'>
          <span className="text-2xl font-bold tracking-wide flex items-center justify-center">
          <img src="/logoSinFondo.png" alt="Cine Rate"  className='w-12 h-12'/>
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
          <span className='text-sm font-semibold text-gray-300'>Forgot your password? Reset it to rejoin the community</span>
         </div>
         <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl shadow-2xl shadow-black/40 mt-4'>
         <div className='px-6 pt-4 flex flex-col'>
        <span className=' text-md uppercase font-semibold'>FORGOT PASSWORD</span>
         </div>
        <form action="" className='flex items-center justify-center flex-col gap-3 rounded-xl py-8 px-6 h-full w-full md:min-w-[340px] relative '>
          <input type="email" className={`w-full 
          px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} placeholder='Email' id="email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="button" value="Forgot password" className={`w-full 
          px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} placeholder='Forgot Password' onClick={() => forgotPassword()} disabled={blockedButton} />
          
          <span className={` ${Loading ? 'flex' : 'hidden'}`} ><SvgLoading/></span>
          {Loading ? <span className='absolute bottom-0'>{isCall}</span>:''}
          <span className=''>{!isCall && blockedButton ? 'You should wait to send new email' : ''}</span>
        </form>
         </div> 
      </div>
  )
}
