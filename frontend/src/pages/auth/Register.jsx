
import { useState } from 'react';
import { Link } from '../../components/common/Link';
import { useAuth } from '../../components/helpers/AuthProvider';

export const Register = () => {
  const { emailSend, buttonLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [ErrorEquals, setErrorEquals] = useState(false);
      function confirmEquals(type, email) {
          if (emailConfirm != null && emailConfirm != email) {
            setTimeout(() => {
              setErrorEquals(true);
            }, 3000);
            return;
          }
        setErrorEquals(false);
        buttonLogin(type, email);
      }
  return (
    <div className='px-10 mt-12 w-full h-screen flex items-center justify-center'>
      <form action="" className='flex items-center justify-center flex-col gap-3 bg-[#272b2f]/80 rounded-sm shadow-sm shadow-gray-900 p-4 h-[460px] w-[340px] relative'>
                  <span className="text-2xl font-bold tracking-wide absolute top-2 mt-2">
          <span className="text-[var(--colorAccent)]">Cine</span>
          <span className="text-white">Rate</span>
          </span>
        <input type="email" placeholder='email' className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} disabled={emailSend} id="email" onChange={e => (setEmail(e.target.value))} required />
                <input type="email" placeholder='confirm email' className={`w-full p-2 bg-[#090c0f] text-gray-100 rounded-sm disabled:opacity-50`} disabled={emailSend}  id="emailConfirm" onChange={e => (setEmailConfirm(e.target.value))} required/>
        <input type="button" value="register" placeholder='Register' className='bg-white w-full rounded-sm p-2 text-black uppercase font-semibold text-[0.9rem] disabled:opacity-80' onClick={() => {confirmEquals("register", email) }} disabled={emailSend} />
        <span>¿You have a account? <Link to="/auth" className='text-[#0ed395] font-semibold cursor-pointer'>Login</Link></span>
        <span>{emailSend ? 'Email has been send' : ''}</span>
        <span>{ErrorEquals ? 'Error in email' : ''}</span>
      </form>
      </div>
  )
}
