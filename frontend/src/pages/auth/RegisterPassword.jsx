import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/helpers/AuthProvider';
import { Link } from '../../components/common/Link';
import { SvgLoading } from '../../assets/icons/SvgLoading';

export const RegisterPassword = () => {
    const navigate = useNavigate();
  
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const { buttonRegisterFinish, registerSuccess, errorRegister } = useAuth();
    const [errorEquals, setErrorEquals] = useState(false);
    const [Loading, setLoading] = useState(false);
    function confirmEquals(type, password) {
        if (password != passwordConfirm) {
          setTimeout(() => {
            setErrorEquals(true);
          }, 3000);
          return;
        }
      setErrorEquals(false);
      buttonRegisterFinish(type,password);
    }
    useEffect(() => {
      if (registerSuccess){
        setTimeout(() => {
          navigate("/auth");
        }, 3000);
      }
    
    }, [registerSuccess])

          useEffect(() => {
        if(!registerSuccess || !errorRegister)return;
                  setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
      
      }, [registerSuccess,errorRegister])
  return (
        <div className='px-10 bg-[radial-gradient(circle,_rgba(14,211,149,0.15)_5%,_rgba(12,61,47,0.35)_15%,_rgba(0,0,0,1)_100%)] w-full min-h-screen flex flex-col items-center justify-center'>
         <div className='flex items-center flex-col justify-center gap-2 mb-6'>
          <span className="text-2xl font-bold tracking-wide flex items-center justify-center">
          <img src="/logoSinFondo.png" alt="Cine Rate"  className='w-12 h-12'/>
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
          <span className='text-sm font-semibold text-gray-300'>Join the CineRate Community</span>
         </div>
         <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl shadow-2xl shadow-black/40 mt-4'>
         <div className='px-6 pt-4 flex flex-col'>
        <span className=' text-md uppercase font-semibold'>Complete the SIGN UP</span>
                  <span className='text-xs font-semibold text-gray-300/60 max-w-[300px] p-2'>Your email has been verified. Please complete your password to finish signing up.</span>

         </div>
            <form action="" className='flex items-center justify-center flex-col gap-3 rounded-xl py-8 px-6 h-full w-full md:min-w-[340px] relative '>
           <input type="password" placeholder='password'  className={`w-full 
      px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} disabled={registerSuccess} id="password" onChange={p => (setPassword(p.target.value))} required />
        <input type="password" placeholder='confirm password'className={`w-full 
      px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`} disabled={registerSuccess}  id="passwordConfirm"  onChange={p => (setPasswordConfirm(p.target.value))} required/>
        <input type="button" value="register" placeholder='Register' className='bg-white w-full rounded-2xl p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80 cursor-pointer'  onClick={() => {confirmEquals("register", password) }} disabled={registerSuccess} />
               <span className={` ${Loading ? 'flex' : 'hidden'}`} ><SvgLoading/></span>
        {/* {Loading ? 
        <> */}
        <span className={`${registerSuccess ? 'flex' : 'hidden'}`}>Registred</span>
        <span className={`absolute bottom-0 ${errorRegister ? 'flex' : 'hidden'}`}>{errorRegister}</span>
        <span className={`${errorEquals ? 'flex' : 'hidden'}`}>Don't equals password</span>
        {/* </> */}
       {/* : ''} */}
        
      </form>
      </div>
      </div>
  )
}
