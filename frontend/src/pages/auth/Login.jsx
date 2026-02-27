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
  const BLOCK_TIME = 15 * 60 * 1000;
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
        useEffect(() => {
        if(!errorLogged)return;
                  setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
      
      }, [errorLogged])
  const isDisabledButton = isLogged || blockedButton;
  return (

        <div className='px-10 bg-[radial-gradient(circle,_rgba(14,211,149,0.15)_5%,_rgba(12,61,47,0.35)_15%,_rgba(0,0,0,1)_100%)] w-full min-h-screen flex flex-col items-center justify-center'>
         <div className='flex items-center flex-col justify-center gap-2 mb-6'>
          <span className="text-2xl font-bold tracking-wide flex items-center justify-center">
          <img src="/logoSinFondo.png" alt="Cine Rate"  className='w-12 h-12'/>
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
          <span className='text-sm font-semibold text-gray-300'>Your experience in CineRate start here!</span>
         </div>
         <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl shadow-2xl shadow-black/40 mt-4'>
         <div className='px-6 pt-4 flex flex-col'>
        <span className=' text-md uppercase font-semibold'>SIGN IN</span>
         </div>

            <form action="" className='flex items-center justify-center flex-col gap-3 rounded-xl py-8 px-6 h-full w-full md:min-w-[340px] relative '>
        <div className='text-start w-full h-auto '>
        <label className="text-[0.7rem] font-semibold text-gray-200 pl-2 py-0.5 block uppercase">Email</label>
        <input type="email" placeholder='email' required className={`w-full 
      px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`}  disabled={isLogged}  id="email" onChange={e => (setEmail(e.target.value))} />
        </div>
              <div className='text-start w-full h-auto '>
        <label className="text-[0.7rem] font-semibold uppercase text-gray-200 pl-2 py-0.5  block">Password</label>
   
        <input type="password" placeholder='password' required className={`w-full 
      px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`}  disabled={isLogged}  id="password"  onChange={p => (setPassword(p.target.value))}/>
    </div>
        <input type="button" value="login" placeholder='Login' className='bg-white w-full rounded-2xl p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80 cursor-pointer' onClick={
          () => {buttonLogin("login", email, password);
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