
import { useState } from 'react';
import { Link } from '../../components/common/Link';
import { useAuth } from '../../components/helpers/AuthProvider';
import { SvgLoading } from '../../assets/icons/SvgLoading';

export const Register = () => {
  const { emailSend, buttonLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [ErrorEquals, setErrorEquals] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [emailSended, setEmailSended] = useState(false)
      function confirmEquals(type, email) {
          if (emailConfirm != null && emailConfirm != email) {
            setTimeout(() => {
              setErrorEquals(true);
            }, 1000);
            return;
          }
          setTimeout(() => {
              setEmailSended(false);
            },1000);
        setErrorEquals(false);
        setEmailSended(true);
        buttonLogin(type, email);
      }
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
          <span className='text-md text-gray-300 font-semibold'>Join the community CineRate</span>
         </div> 
      <div>

      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f] rounded-xl shadow-sm shadow-gray-900 py-8 px-6 h-full w-full md:min-w-[340px] relative'>
        <span className='text-center text-md uppercase font-semibold'>Register Account</span>
        <input type="email" placeholder='email' className={`w-full p-2 bg-[#1a1a1a] text-gray-100 rounded-sm disabled:opacity-50`}  id="email" onChange={e => (setEmail(e.target.value))} required />
        <input type="email" placeholder='confirm email' className={`w-full p-2 bg-[#1a1a1a] text-gray-100 rounded-sm disabled:opacity-50`}   id="emailConfirm" onChange={e => (setEmailConfirm(e.target.value))} required/>
        
        <input type="button" value="register" placeholder='Register' className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80 cursor-pointer' 
        onClick={() => {confirmEquals("register", email);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }}  />
       <span className='text-gray-300 text-sm'>You have a account? <Link to="/auth" className='text-[#0ed395] font-semibold cursor-pointer'>Login</Link></span>
        <span className={` ${Loading ? 'flex' : 'hidden'}`} ><SvgLoading/></span>
        <span className={`${emailSended ? 'flex' : 'hidden'} text-green-300`}>
          {emailSend}
        </span>
        <span className={`${ErrorEquals ? 'flex' : 'hidden'}`}>Error in completed email</span>
        
      </form>
      </div>
      </div>
  )
}
