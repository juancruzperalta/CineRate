
import { useAuth } from '../../components/helpers/AuthProvider';
import { Navigate } from 'react-router-dom';
export const AccountLogged = () => {
  const { isLogged , user } = useAuth();
  if (!isLogged) {
   return <Navigate to="/auth" replace />;
  }
    console.log(user);
  return (
    <div className='px-10  w-full h-full mb-8 gap-4'>
      <div className='w-full h-screen  grid grid-cols-2'>
        <section className='flex flex-col justify-center gap-2 h-full w-full'>
          <div className='flex flex-col h-full w-full items-center justify-center gap-3'>
            <img src="avatarUser" alt="avatar" className='rounded-full bg-gray-200 w-40 h-40 text-start'/>
          <span>{user?.email}</span>
          <span>your votes</span>
          <span>Registrado desde el :</span>
          <span>Change the password</span>
          </div>
        </section>
      <section className='flex flex-col justify-center gap-2 h-full w-full'>
        <article className='flex gap-2'>
          <div className='gap-2 flex flex-col items-center justify-center'>
            <h2>VOTES</h2>
            <div className='flex gap-2 items-center justify-center'>
              <div  className='flex flex-col items-center justify-center'>
                {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
                <span>vote + puntaje</span>
                <span>editar voto</span>
                <span>borrar voto</span>
              </div>
              <div className='flex flex-col items-center justify-center'>
                {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
                <span>vote + puntaje</span>
                <span>editar voto</span>
                <span>borrar voto</span>
              </div>
              <div className='flex flex-col items-center justify-center'>
                {/* <img src="" className='w-[140px] h-[200px]' alt="" /> */}
                <span>vote + puntaje</span>
                <span>editar voto</span>
                <span>borrar voto</span>
              </div>
            </div>
          </div>
         </article>
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
