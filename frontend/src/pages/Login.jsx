import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useloginOrRegister } from '../hooks/auth/useloginOrRegister'

export const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [tokenTrue, setTokenTrue] = useState(false);
  const [type, setType] = useState("");
  const { LoginRegister, isLogged } = useloginOrRegister();
  const buttonLogin = async () => {
    if (!tokenTrue) {
      if (type) { 
        await LoginRegister({
          type: type,
          email: email,
          password: password,
        })
      }
    } else {
      console.log("You already logged it");
    }
  };
 useEffect(() => {
  setTokenTrue(localStorage.getItem("token"));
}, []);
  return (
    <div className='px-10 mt-12 w-full h-screen flex items-center justify-center'>
      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f]/80 rounded-sm shadow-sm shadow-gray-900 p-4 h-[460px] w-[340px] relative'>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="email" placeholder='email' className='w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm' id="email" onChange={e => (setEmail(e.target.value))} required/>
        <input type="password" placeholder='password' className='w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm'  id="password"  onChange={p => (setPassword(p.target.value))} required/>
        <input type="button" value="login" placeholder='Login' className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem]' onClick={()=>{setType("login"), buttonLogin()}} />
        <span>¿You don't a account? <Link to="/accounts/register" className='text-[#0ed395] font-semibold cursor-pointer'>Register</Link></span>
        <span>{tokenTrue  ? 'You already logged it' : ''}</span>
        <span>{(isLogged && !tokenTrue) && type == 'login' ? 'Logged' : ''}</span>
        <span>{isLogged && type == 'register' ? 'Register' : ''}</span>
        
      </form>
      </div>
  )
}
