import { 
    useQuery,
    useMutation,
  useQueryClient,
useInfiniteQuery } from '@tanstack/react-query';
import { createUserAccount, signInUser } from '../appwrite/api';
import { NewUser } from '../../types';


export const useCreateUserAccountMutation = ()=>{
    return useMutation({
        mutationFn: (user:NewUser)=> createUserAccount(user),

    })
}

export const useSignInUserMutation = ()=>{
    return useMutation({
        mutationFn: (user:{email:string,password:string})=> signInUser(user),
        
    })
}