import { Link,useLocation } from 'react-router-dom'
import { bottombarLinks } from '../../../constants'

const Bottombar = () => {
    const {pathname}= useLocation()
  return (
    <section className="z-50 flex justify-between w-full bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden">
         {bottombarLinks.map((link)=>{
           const isActive = pathname === link.route
           return(
              

            <Link to={link.route} key={link.label}
            className={`${isActive && 'bg-purple-500 rounded-[10px]' } flex items-center flex-col gap-1 p-2 transition`}>
              <img src={link.imgURL} alt={link.label} 
               width={16}
               height={16}
               className={`${isActive && 'invert-white '}`}
               />
               <p className='text-[10px] font-medium leading-[140%] text-light-2'>{link.label}</p>
                </Link>
         )})}
    </section>
  )
}

export default Bottombar