import { Models } from "appwrite"
import { Link } from "react-router-dom"
import { multiFormatDateString } from "../../../lib/utils";
import { useUserContext } from "../../../context/AuthContext";


interface PostCardProps{
    post:Models.Document
}
const PostCard = ({post}:PostCardProps) => {
  console.log(post.creator.$id);

  const {user} =useUserContext()

  if(!post.creator) return;
  
  return (
    <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm ">
      <div className="flex-between">
        <div className=" flex items-center gap-3">
          <Link to={`/profile/${post.creator}`}>
            <img src={post?.creator?.imageUrl || 
                 "/assets/images/profile.png"} 
                 alt="creator image" 
                 className=" rounded-full w-12 lg:h-12"
                 />
          </Link>
          <div className=" flex flex-col">
            <p className=" base-medium lg:body-bold text-light-1">{post.creator.name}</p>
            <div className=" flex-center gap-2 text-light-3">
              <p className="text-[12px] font-semibold leading-[140%] lg:small-regular">{multiFormatDateString(post.$createdAt)}.</p>
              <p className="text-[12px] font-semibold leading-[140%] lg:small-regular">{post.location}</p>
            </div>

          </div>

        </div>
        {user.id == post.creator.$id &&
        
        <Link to={`/update-post/${post.$id}`}>
        <img src="/assets/icons/edit.svg" 
          width={20}
          height={20}
        />
        </Link>
        }

      </div>
      <Link to={`/posts/${post.$id}`}>
      <div className=" small-medium lg:base-medium py-5">
        <p>{post.caption}</p>
      </div>
      </Link>
    </div>
  )
}

export default PostCard