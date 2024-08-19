import { 
    useQuery,
    useMutation,
  useQueryClient,
useInfiniteQuery } from '@tanstack/react-query';
import {createPost, createUserAccount, getRecentPosts, signInUser,signOutAccount } from '../appwrite/api';
import { NewPost, NewUser } from '../../types';
import { QUERY_KEYS } from './queryKey';


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
export const useSignOutAccount = ()=>{
    return useMutation({
        mutationFn: signOutAccount,
        
    })
}

export const useCreatePost =()=>{
    const queryClient = useQueryClient()
    return useMutation({
    mutationFn: (post:NewPost)=> createPost(post),
    onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        })
    }
    })
}

export const useGetRecentPosts = ()=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn:getRecentPosts
    })
}