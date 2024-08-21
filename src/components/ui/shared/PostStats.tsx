import { Models } from "appwrite"
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "../../../lib/react-query/queriesAndMutations"
import { useEffect, useState } from "react";
import { checkIsLiked } from "../../../lib/utils";
import Loader from "./Loader";



interface PostStatsProps{
    post:Models.Document,
    userId:string
}
const PostStats = ({post,userId}:PostStatsProps) => {

  const likesList= post.likes.map((user:Models.Document)=> user.$id);

  // states
   const [likes,setLikes]= useState(likesList)
   const [isPostSaved,setIsPostSaved]= useState(false)

  const {mutate:likePost}= useLikePost();
  const {mutate:savePost,isPending:isSavingPost}= useSavePost();
  const {mutate:deleteSavedPosts,isPending:isDeletingSavedPost}= useDeleteSavedPost();

  const  {data:currentUser}= useGetCurrentUser();

  const savedPostRecord= currentUser?.save.find(
      (record:Models.Document)=>record.post.$id === post.$id)


  useEffect(()=>{

    setIsPostSaved(!savedPostRecord);
  },[currentUser])

  const  handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>)=>{

    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked= newLikes.includes(userId);
  
    if(hasLiked){
    newLikes=newLikes.filter((id:string)=> id !== userId)
    }
    else{
    newLikes.push(userId)
    }


    setLikes(newLikes);
    likePost({postId:post.$id,likesArray:newLikes})
  }
  const  handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>)=>{

    e.stopPropagation();

    if(savedPostRecord){
      setIsPostSaved(false);
      deleteSavedPosts(savedPostRecord.$id)
      return;
    }

    savePost({postId:post.$id,userId});
    setIsPostSaved(true);
  }

  return (
    <div className=" flex justify-between items-center z-20">
      <div className=" flex gap-2 mr-5">
        <img 
        
          src={ checkIsLiked(likesList,userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className=" cursor-pointer"
           />
           <p className=" text-[14px] font-medium leading-[140%] lg:base-medium">{likes.length}</p>
      </div>
      <div className=" flex gap-2 mr-5">
        {isDeletingSavedPost || isSavingPost ? <Loader/>:
        <img 
          src={ isPostSaved ? "/assets/icons/saved.svg":"/assets/icons/save.svg"} 
          alt="like"
          width={20}
          height={20}
          onClick={handleSavePost}
          className=" cursor-pointer"
           />}
      </div>

      
    </div>
  )
}

export default PostStats