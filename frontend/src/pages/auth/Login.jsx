import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/helpers/AuthProvider';
import { SvgLoading } from '../../assets/icons/SvgLoading';



export const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLogged, buttonLogin, errorLogged, LoggedRateLimit } = useAuth();
  const [blockedButton, setBlockedButton] = useState(false);
  const [Loading, setLoading] = useState(false);
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
    <div className='px-10 bg-[radial-gradient(circle,_rgba(14,211,149,0.45)_1%,_rgba(14,211,149,0.2)_5%,_rgba(12,61,47,0.35)_15%,_rgba(0,0,0,1)_100%)] w-full h-screen flex flex-col items-center justify-center'>
         <div className='flex mb-4 flex-col items-center justify-center'>
         <div className='flex items-center justify-center'>
          <img src="/logoSinFondo.png" alt="Cine Rate"  className='w-12 h-12'/>
          <span className="text-2xl font-bold tracking-wide flex items-center justify-center">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
         </div>
          <span className='text-md text-gray-300 font-semibold'>Your experience in CineRate start here</span>
         </div> 
      <div>

      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f] rounded-xl shadow-sm shadow-gray-900 py-8 px-6 h-full w-full md:min-w-[340px] relative'>
        <input type="email" placeholder='email' className={`w-full p-2 bg-[#1a1a1a] text-gray-100 rounded-lg disabled:opacity-50`} disabled={isLogged}  id="email" onChange={e => (setEmail(e.target.value))} required/>
        <input type="password" placeholder='password' className='w-full p-2 bg-[#1a1a1a] text-gray-100 rounded-lg disabled:opacity-50' disabled={isLogged}  id="password"  onChange={p => (setPassword(p.target.value))} required/>
        <input type="button" value="login" placeholder='Login' className='bg-white w-full rounded-lg p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80 cursor-pointer' onClick={
          () => {buttonLogin("login", email, password);
          setLoading(true);
          setTimeout(() => {
            setLoading(false)
          }, 1500);
          }} disabled={isDisabledButton}/>
        <span className='text-gray-300 text-sm'>You don't a account? <Link to="/auth/register" className='text-[#0ed395] font-semibold cursor-pointer'>Register</Link></span>
        <span className='text-gray-300 text-sm'>If you forgot your password? <Link to="/user/forgot-password" className='text-[#0ed395] font-semibold cursor-pointer'>Click here</Link></span>
        <span className={`${isLogged ? 'flex' : 'hidden'}`}>You already logged it</span>
        <span className={` ${Loading ? 'flex' : 'hidden'}`} ><SvgLoading/></span>

        <span className={`text-red-400 font-semibold ${errorLogged ? 'flex' : 'hidden'}`} >{errorLogged}</span>
        <span className={`text-red-400 font-semibold ${!errorLogged&&blockedButton ? 'flex' : 'hidden'}`}>{!errorLogged && blockedButton ? `You should wait a ${BLOCK_TIME/60/1000} minutes to login renew` : ''}</span>
      </form>
          </div>
      </div>
  )
}