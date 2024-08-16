
import React, { createContext,useContext,useEffect,useState } from 'react'
import { IContextType, User } from '../types';
import { getCurrentUser } from '../lib/appwrite/api';
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER={
    id:"",
    name:"",
    email:"",
    username:"",
    password:"",
    imageUrl:"",
    bio:""
}

export const INITIAL_STATE={
    user:INITIAL_USER,
    isAuthenticated:false,
    isLoading:false,
    setUser: ()=>{},
    setIsAuthenticated: ()=>{},
    checkAuthUser: async()=>false as boolean,
}

const AuthContext= createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ( {children}:{children:React.ReactNode}) => {
    const [user,setUser]= useState<User>(INITIAL_USER);
    const[isLoading,setIsLoading]= useState(false);
    const[isAuthenticated,setIsAuthenticated]= useState(false);

    const navigate = useNavigate();

   const checkAuthUser = async()=>{
    try {
        
        const currentAccount= await getCurrentUser();
        if(currentAccount){
            setUser({
                id:currentAccount.$id,
                name:currentAccount.name,
                email:currentAccount.email,
                username:currentAccount.username,
                imageUrl:currentAccount.image,
                bio:currentAccount.bio
            })

            setIsAuthenticated(true);
            return true;
        }
        else{
            setIsAuthenticated(false);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
        
    }
    finally{
        setIsLoading(false);
 
    }
   };

   useEffect(()=>{
   if(localStorage.getItem("cookieFallback") === '[]'
      || localStorage.getItem("cookieFallback") === null){
     navigate("/signin")
      }

      checkAuthUser();
   },[])
    const value={
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext= ()=>useContext(AuthContext);