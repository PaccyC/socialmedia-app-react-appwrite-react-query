import { 
    useQuery,
    useMutation,
  useQueryClient,
useInfiniteQuery } from '@tanstack/react-query';
import {createPost, createUserAccount, deletePost, deleteSavedPost, editPost, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, likePost, savePost, searchPosts, signInUser,signOutAccount } from '../appwrite/api';
import { NewPost, NewUser, UpdatePost } from '../../types';
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

export const useLikePost =()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({postId,likesArray}:{postId:string,likesArray:string[]})=> likePost(postId,likesArray),
        onSuccess : (data)=>{
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
                }
            )
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS, ]
                }
            )
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_USER_BY_ID, ]
                }
            )
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_POSTS, ]
                }
            )
        }
    })
}


export const useSavePost =()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({postId,userId}:{postId:string,userId:string})=> savePost(postId,userId),
        onSuccess : (data)=>{
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS, ]
                }
            )
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_USER_BY_ID, ]
                }
            )
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_POSTS, ]
                }
            )
        }
    })
}


export const useDeleteSavedPost =()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({savedPostRecordId}:{savedPostRecordId:string})=> deleteSavedPost(savedPostRecordId),
        onSuccess : (data)=>{
           
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS, ]
                }
            )
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_USER_BY_ID, ]
                }
            )
            queryClient.invalidateQueries(
                {
                    queryKey:[QUERY_KEYS.GET_POSTS, ]
                }
            )
        }
    })
}

export const useGetCurrentUser = ()=>{
    return useQuery({
         queryKey:[QUERY_KEYS.GET_CURRENT_USER],
         queryFn: getCurrentUser
    })
}


export const useGetPostById =(postId:string)=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_POST_BY_ID,postId],
        queryFn:()=> getPostById(postId),
        enabled:true
    })
}

export const useUpdatePost = ()=>{
    const queryClient= useQueryClient();
    return useMutation({
        mutationFn:(post:UpdatePost)=>editPost(post),
        onSuccess: ()=>{
            
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID]
            })
        }
    })
}

export const useDeletePost =()=>{
    const queryClient= useQueryClient();

    return useMutation({
        mutationFn:({postId,imageId}:{postId:string,imageId:string})=> deletePost(postId,imageId),
        onSuccess:()=>{

            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
           })
        } 
    })
}

export const useGetPost=( )=>{
    return useInfiniteQuery({
        queryKey:[QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn:getInfinitePosts,
        getNextPageParam: (lastPage)=>{
            if(lastPage && lastPage.documents.length ===0 ) return null;
            const lastId= lastPage?.documents[lastPage.documents.length -1].$id;
            return lastId;
        }
    })
}

export const useSearchPost =(searchTerm:string)=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_POSTS],
        queryFn: ()=>searchPosts(searchTerm),
        enabled:!!searchTerm
    })
}