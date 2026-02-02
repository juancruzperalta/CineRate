import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/helpers/AuthProvider';
import { useNavigate } from 'react-router-dom';
export const ForgotPassword = () => {
  const { isLogged } = useAuth();
  const [isCall, setIsCall] = useState('');
  const [blockedButton, setBlockedButton] = useState(false);
  const [email, setEmail] = useState("");
  const [forgotRateLimit, setForgotRateLimit] = useState(false);
  const BLOCK_TIME = 15 * 60 * 1000; // 15 min
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
 <div className='px-10 mt-12 w-full h-screen flex items-center justify-center'>
      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f]/80 rounded-sm shadow-sm shadow-gray-900 px-8 py-2 h-[240px] w-[400px] relative'>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="email"  className={`w-full px-2 py-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} placeholder='Email' id="email" onChange={(e) => setEmail(e.target.value)} required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"/>
        <input type="button" value="Forgot password" className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80' placeholder='Forgot Password' onClick={() => forgotPassword()} disabled={blockedButton} />
        <span className='absolute bottom-0'>{isCall}</span>
                <span className=''>{!isCall && blockedButton ? 'You should wait to send new email' : ''}</span>

      </form>
      </div>
  )
}
