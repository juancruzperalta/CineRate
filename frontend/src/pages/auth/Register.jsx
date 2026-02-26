
import { useEffect, useState } from 'react';
import { Link } from '../../components/common/Link';
import { useAuth } from '../../components/helpers/AuthProvider';
import { SvgLoading } from '../../assets/icons/SvgLoading';

export const Register = () => {
  const { emailSend, buttonLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [ErrorEquals, setErrorEquals] = useState(false);
  const [Loading, setLoading] = useState(false);
      function confirmEquals(type, email) {
          if (emailConfirm != null && emailConfirm != email) {
            setTimeout(() => {
              setErrorEquals(true);
            }, 2000);
            return;
          }
        setErrorEquals(false);
        buttonLogin(type, email);
      }
      useEffect(() => {
        if(!emailSend)return;
                  setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
      
      }, [emailSend])
      
  return (
        <div className='px-10  bg-[radial-gradient(circle,_rgba(14,211,149,0.15)_5%,_rgba(12,61,47,0.35)_15%,_rgba(0,0,0,1)_100%)] w-full min-h-screen flex flex-col items-center justify-center'>
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
        <span className=' text-md uppercase font-semibold'>SIGN UP</span>
         </div>
            <form action="" className='flex items-center justify-center flex-col gap-3 rounded-xl py-8 px-6 h-full w-full md:min-w-[340px] relative '>
        <div className='text-start w-full h-auto '>
        <label className="text-[0.7rem] font-semibold text-gray-200 pl-2 py-0.5 block uppercase">Email</label>
        <input type="email" placeholder='cinerate@example.com' required className={`w-full 
      px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`}  id="email" onChange={e => (setEmail(e.target.value))}  />
        </div>
        <div className='text-start w-full h-auto '>
        <label className="text-[0.7rem] font-semibold uppercase text-gray-200 pl-2 py-0.5  block">Confirm Email</label>
        <input type="email" placeholder='cinerate@example.com' required className={`w-full 
      px-3 py-2 rounded-2xl bg-[#171818]/80 text-white placeholder:text-gray-300/50 outline-none  transition`}   id="emailConfirm" onChange={e => (setEmailConfirm(e.target.value))}/>
        </div>
        
        <input type="button" value="register" placeholder='Register' className='bg-white w-full rounded-2xl p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80 cursor-pointer' 
        onClick={() => {confirmEquals("register", email);}}  />
       <span className='text-gray-300 text-sm'>You have a account? <Link to="/auth" className='text-[#0ed395] font-semibold cursor-pointer'>Login</Link></span>
       <span className={` ${Loading ? 'flex' : 'hidden'}`} ><SvgLoading/></span>
            {Loading ? 
          <span>
          {emailSend}
        </span>
          : ''}
        <span className={`${ErrorEquals ? 'flex' : 'hidden'}`}>Error in email completed</span>
        
      </form>
         </div> 
      <div>
          <span className='text-xs w-full text-center text-gray-300/50'>By registering, you agree to the Terms of Service and Privacy Policy</span>

      </div>
      </div>
  )
}
