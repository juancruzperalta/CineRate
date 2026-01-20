
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/helpers/AuthProvider';
import { Link, Navigate } from 'react-router-dom';
export const AccountLogged = () => {
  const { isLogged, user } = useAuth();
  const [countVotes, setCountVotes] = useState(0)
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getInfoVotes = async () => {
    if (!token) return;
      const res = await fetch(`http://localhost:8085/api/vote/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      if (!res.ok) {
        console.log("error");
        return;
      }
      const data = await res.json();
      setCountVotes(data);
    }
    getInfoVotes();
  }, [token])
  if (!isLogged) {
   return <Navigate to="/auth" replace />;
  }
  
  return (
    <div className='px-10  w-full h-full mb-8 gap-4'>
      <div className='w-full h-screen  grid '>
        <section className='flex flex-col justify-center gap-2 h-full w-full'>
          <div className='flex flex-col h-full w-full items-center justify-center gap-3'>
            <img src="avatarUser" alt="avatar" className='rounded-full bg-gray-200 w-40 h-40 text-start'/>
            <span className='text-gray-300 text-[0.8rem] md:text-[0.9rem]'>Account Created {user?.created_at}</span>
            <span>{user?.email}</span>
            <span>Your Votes: {countVotes}</span>
            <Link to="/user/changePassword" className='text-[#0ed395] font-semibold cursor-pointer'>Change the Password</Link>
          </div>
        </section>

      </div>
      <section className='flex justify-start gap-2 h-full w-full'>
        <article className='flex gap-2'>
          <div className='gap-2 flex flex-col'>
            <h2>SERIES FAVS</h2>
            <div className='flex'>
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
            </div>
          </div>
         </article>
        <article className='flex gap-2'>
          <div className='gap-2 flex flex-col'>
            <h2>MOVIES FAVS</h2>
            <div className='flex'>
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
              {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
            </div>
          </div>
         </article>
       </section>
      </div>
  )
}
