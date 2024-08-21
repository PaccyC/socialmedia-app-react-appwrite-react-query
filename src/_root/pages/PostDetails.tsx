import { Link, useParams } from "react-router-dom"
import { useGetPostById } from "../../lib/react-query/queriesAndMutations";
import Loader from "../../components/ui/shared/Loader";
import { multiFormatDateString } from "../../lib/utils";
import { useUserContext } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import PostStats from "../../components/ui/shared/PostStats";



const PostDetails = () => {
  const {id}= useParams();
  const {user}= useUserContext();
  const {data:post, isPending:isLoadingPost}= useGetPostById(id ||  "");


  const handleDeletePost =()=>{

  }
  
  return (
    <div className=" flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      {isLoadingPost ? <Loader/>:(
        <div className=" bg-dark-2 w-full max-w-5xl rounded-[30px] flex flex-col xl:flex-row border border-dark-4 xl:rounded-l-[24px]">

          <img 
            src={post?.image} 
            alt="post"
            className=" h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5 bg-dark-1"
            />
          <div className=" bg-dark-2 flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className=" flex-between w-full">

         
          <Link to={`/profile/${post?.creator}`} 
              className=" flex gap-3 items-center">
            <img src={post?.creator?.imageUrl || 
                 "/assets/images/profile.png"} 
                 alt="creator image" 
                 className=" rounded-full w-8 h-8 lg:w-12 lg:h-12"
                 />
          
          <div className=" flex flex-col">
            <p className=" base-medium lg:body-bold text-light-1">{post?.creator.name}</p>
            <div className=" flex-center gap-2 text-light-3">
              <p className="text-[12px] font-semibold leading-[140%] lg:small-regular">{multiFormatDateString(post?.$createdAt)}.</p>
              <p className="text-[12px] font-semibold leading-[140%] lg:small-regular">{post?.location}</p>
            </div>

          </div>
          </Link>

          <div className=" flex-center gap-4">
            <Link to={`/update-post/${post?.$id}`}>
            {user.id == post?.creator.$id &&
            <img 
             src="/assets/icons/edit.svg"
             width={24}
             height={24}
             
             alt="edit"
             />
             }
            
            </Link>

            <div className=" flex-center">
            {user.id == post?.creator.$id &&
                <Button
                 onClick={handleDeletePost}
                 variant="ghost"
                  className="p-0 flex gap-3 hover:bg-transparent hover:text-light-1  text-light-1 small-medium lg:base-medium"

                >
                <img 
                 src="/assets/icons/delete.svg"
                alt="delete"
                 width={24}
                 height={24} />
                </Button>
            }
            </div>
          </div>

          </div>
          <hr className=" border w-full border-dark-4/80"/>
          <div className=" flex flex-col flex-1 w-full small-medium lg:base-medium ">
            <p>{post?.caption}</p>
            <ul className=" flex gap-1 mt-2">
              {post?.tags.map((tag:string)=>(
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
      </div>
      <div className="w-full">

        <PostStats post={post} userId={user.id}/>
      </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails