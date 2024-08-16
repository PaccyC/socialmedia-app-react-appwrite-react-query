import { Link, NavLink ,useLocation, useNavigate} from "react-router-dom"
import { useUserContext } from "../../../context/AuthContext"

import { sidebarLinks } from "../../../constants"
import { INavLink } from "../../../types"
import { Button } from "../button"
import { useSignOutAccount } from "../../../lib/react-query/queriesAndMutations"
import { useEffect } from "react"
const LeftBar = () => {
    const {mutate:signOut,isSuccess}= useSignOutAccount()
const navigate= useNavigate();
const {user}= useUserContext()
 useEffect (()=>{
    if(isSuccess){
    navigate(0)
    
    }

 },[isSuccess])
    const {pathname}= useLocation()
  return (
    <nav className=" hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2">

     <div className=" flex flex-col gap-11">
     <Link to='/' className=" flex gap-3 items-center">
            <img 
              src="/assets/images/logo.svg" 
              alt="logo"
              width={170}
              height={36} />
     </Link>
     <Link to={`/profile/${user.id}`} className=" flex items-center gap-3">
                 <img 
                  src={user.imageUrl || 
                     `/assets/images/profile.png`} 
                      alt="profile image"
                   className=" h-14 w-14 rounded-full"    />
                
                <div className=" flex flex-col">
                    <p className=" text-[18px] font-bold leading-[140%]">{user.name}</p>
                    <p className=" text-[14px] font-normal leading-[140%] text-light-3">
                        @{user.username}
                    </p>
                </div>
    </Link>
     <ul className=" flex flex-col gap-6">
       {sidebarLinks.map((link:INavLink)=>{
           const isActive = pathname === link.route
           return(
               <li key={link.route}
               className={`rounded-lg base-medium hover:bg-primary-500 transition group ${isActive && 'bg-primary-500'}`}>

            <NavLink to={link.route} className="flex gap-4 items-center p-4">
              <img src={link.imgURL} alt={link.label} 
               className={`group-hover:invert-white ${isActive && 'invert-white '}`}
               />{link.label} </NavLink>
        </li>
   )})}
     </ul>
   </div>
   <Button 
      onClick={()=>signOut()}
                  variant="ghost" 
                 className=" flex gap-4 items-center justify-start hover:bg-transparent hover:text-white"
                >
                  <img src="/assets/icons/logout.svg" alt="logout" />
                  <p className=" text-[14px] font-medium leading-[140%] lg:base-medium">Logout</p>
                </Button>

    </nav>
  )
}

export default LeftBar