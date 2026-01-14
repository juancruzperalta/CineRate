import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/helpers/AuthProvider';
import { Link } from '../../components/common/Link';

export const Register = () => {
 const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [emailConfirm, setEmailConfirm] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const { buttonLogin, registerSuccess } = useAuth();
  const [errorEquals, setErrorEquals] = useState(false);
  
  function confirmEquals(type, email, password) {
      if (emailConfirm && passwordConfirm != null && emailConfirm != email || password != passwordConfirm) {
        setTimeout(() => {
          setErrorEquals(true);
        }, 3000);
        return;
      }
    setErrorEquals(false);
    buttonLogin(type, email, password);
  }
  useEffect(() => {
    if (registerSuccess)
      setTimeout(() => {
      navigate("/auth");
  }, 3000);
  
  }, [registerSuccess])
  
  return (
    <div className='px-10 mt-12 w-full h-screen flex items-center justify-center'>
      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f]/80 rounded-sm shadow-sm shadow-gray-900 p-4 h-[460px] w-[340px] relative'>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="email" placeholder='email' className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} disabled={registerSuccess} id="email" onChange={e => (setEmail(e.target.value))} required />
                <input type="email" placeholder='confirm email' className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} disabled={registerSuccess}  id="emailConfirm" onChange={e => (setEmailConfirm(e.target.value))} required/>
        <input type="password" placeholder='password' className='w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50' disabled={registerSuccess} id="password" onChange={p => (setPassword(p.target.value))} required />
        <input type="password" placeholder='confirm password' className='w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50' disabled={registerSuccess}  id="passwordConfirm"  onChange={p => (setPasswordConfirm(p.target.value))} required/>
        <input type="button" value="register" placeholder='Register' className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80' onClick={() => {confirmEquals("register", email, password) }} disabled={registerSuccess} />
        <span>¿You have a account? <Link to="/auth" className='text-[#0ed395] font-semibold cursor-pointer'>Login</Link></span>
        <span>{registerSuccess ? 'Register ready' : ''}</span>
        <span>{errorEquals ? "Don't equals email or password" : ''}</span>
        
      </form>
      </div>
  )
}
