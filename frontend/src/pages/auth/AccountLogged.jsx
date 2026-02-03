
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/helpers/AuthProvider';
import { Link, Navigate } from 'react-router-dom';
import { WatchLaterSerieItem } from '../../components/helpers/WatchLaterItem';
export const AccountLogged = () => {
  const { isLogged, user } = useAuth();
  const [countVotes, setCountVotes] = useState(0)
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [watchLaterSeries, setWatchLaterSeries] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getInfoVotes = async () => {
      if (!token) return;
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/api/vote/getAll`, {
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
    const getWatchLaterMovies = async () => {
      if (!token) return;
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/api/watchLater/getAll?isSerie=false`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      if (!res.ok) {
        console.log("fail to load watch later");
        return;
      }
      const data = await res.json();
      setWatchLaterMovies(data);
    }
    const getWatchLaterSeries = async () => {
      if (!token) return;
      const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/api/watchLater/getAll?isSerie=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      if (!res.ok) {
        console.log("fail to load watch later");
        return;
      }
      const data = await res.json();
      setWatchLaterSeries(data);
    }
    getWatchLaterSeries();
    getWatchLaterMovies();
    getInfoVotes();
  }, [token])
  if (!isLogged) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className='px-10 flex flex-col items-center justify-center w-full h-full mb-8 gap-4'>
      <div className='w-full h-screen  grid '>
        <section className='flex flex-col justify-center gap-2 h-full w-full'>
          <div className='flex flex-col h-full w-full items-center justify-center gap-3'>
          <img
        src="/1fb4eb9d-c23b-4dcb-9818-c037389947c8.png"
        alt="avatar"
        className="rounded-full bg-gray-200 w-40 h-40"
      />
            <span className='text-gray-300 text-[0.8rem] md:text-[0.9rem]'>Account Created {user?.created_at}</span>
            <span>{user?.email}</span>
            <span>Your Votes: {countVotes}</span>
            <Link to="/user/changePassword" className='text-[#0ed395] font-semibold cursor-pointer'>Change the Password</Link>
          </div>
        </section>

      </div>
      <section className=' flex-col justify-center items-center gap-4 h-full w-full'>
        <article className='flex gap-2'>
          <div className='gap-2 flex flex-col'>
            <h2 className='font-semibold uppercase text-[#0ed395]'>SERIES VIEW LATER</h2>
            <div className='grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
              {
                watchLaterSeries.map(({ mediaId, serie }) => (
                serie ? <WatchLaterSerieItem key={mediaId} mediaId={mediaId} value={serie} /> : null))
            }
            </div>
          </div>
         </article>
        <article className='flex gap-2 mt-4'>
          <div className='gap-2 flex flex-col'>
            <h2  className='font-semibold uppercase text-[#0ed395]'>MOVIES VIEW LATER</h2>
            <div className='grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                       {
                watchLaterMovies.map(({ mediaId, serie }) => (
                !serie ? <WatchLaterSerieItem key={mediaId} mediaId={mediaId} value={serie} /> : null))
            }
            </div>
          </div>
         </article>
       </section>
      </div>
  )
}
