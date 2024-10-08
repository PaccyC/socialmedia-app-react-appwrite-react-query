import { Outlet,Navigate } from 'react-router-dom'

import { useUserContext } from '../context/AuthContext';
const AuthLayout = () => {

  const {isAuthenticated} =useUserContext();;
  return (
   <>
   {isAuthenticated ? (
    <Navigate to='/'/>
   ):(
   <>
   <section className='flex flex-1 justify-center items-center py-10 flex-col'>
    <Outlet/>
   </section>
   </>
   )}
   </>
  )
}

export default AuthLayout