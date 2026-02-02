import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/helpers/AuthProvider';



export const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLogged, buttonLogin, errorLogged, LoggedRateLimit } = useAuth();
  const [blockedButton, setBlockedButton] = useState(false);
  const BLOCK_TIME = 15 * 60 * 1000; // 15 min
    const until = Date.now() + BLOCK_TIME;
  useEffect(() => {
    if (LoggedRateLimit) {
      localStorage.setItem("RATE_LIMIT", until.toString());
      setBlockedButton(true);
      setTimeout(() => {
        localStorage.removeItem("RATE_LIMIT");
        setBlockedButton(false);
      },BLOCK_TIME);
    }
  }, [LoggedRateLimit])
  useEffect(() => {
    const block = localStorage.getItem("RATE_LIMIT")
    if (block && Date.now() < Number(block)) {
      setBlockedButton(true);
      const timeOut =Number(block)-Date.now();
      setTimeout(() => {
        localStorage.removeItem("RATE_LIMIT");
        setBlockedButton(false);
      }, timeOut);
    }
  }, [])
  
  useEffect(() => {
    if (isLogged)
      navigate("/user/account");
  
  }, [isLogged])
  const isDisabledButton = isLogged || blockedButton;
  return (
    <div className='px-10 mt-12 w-full h-screen flex items-center justify-center'>
      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f]/80 rounded-sm shadow-sm shadow-gray-900 p-4 h-[460px] w-[340px] relative'>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="email" placeholder='email' className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} disabled={isLogged}  id="email" onChange={e => (setEmail(e.target.value))} required/>
        <input type="password" placeholder='password' className='w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50' disabled={isLogged}  id="password"  onChange={p => (setPassword(p.target.value))} required/>
        <input type="button" value="login" placeholder='Login' className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80' onClick={() => {buttonLogin("login", email, password) }} disabled={isDisabledButton}/>
        <span>¿You don't a account? <Link to="/auth/register" className='text-[#0ed395] font-semibold cursor-pointer'>Register</Link></span>
        <span>¿If you forgot your password? <Link to="/user/forgot-password" className='text-[#0ed395] font-semibold cursor-pointer'>Click here</Link></span>
        <span>{isLogged ? 'You already logged it' : ''}</span>
        <span className='text-red-400 font-semibold ' >{errorLogged}</span>
        <span className='text-red-400 font-semibold '>{!errorLogged && blockedButton ? `You should wait a ${BLOCK_TIME/60/1000} minutes to login renew` : ''}</span>
      </form>
      </div>
  )
}