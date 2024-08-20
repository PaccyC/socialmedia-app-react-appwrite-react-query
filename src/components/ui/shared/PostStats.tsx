import { Models } from "appwrite"



interface PostStatsProps{
    post:Models.Document,
    userId:string
}
const PostStats = ({post,userId}:PostStatsProps) => {
  return (
    <div className=" flex justify-between items-center z-20">
      <div className=" flex gap-2 mr-5">
        <img 
          src="/assets/icons/liked.svg" 
          alt="like"
          width={20}
          height={20}
          onClick={()=>{}}
          className=" cursor-pointer"
           />
           <p className=" text-[14px] font-medium leading-[140%] lg:base-medium">0</p>
      </div>
      <div className=" flex gap-2 mr-5">
        <img 
          src="/assets/icons/save.svg" 
          alt="like"
          width={20}
          height={20}
          onClick={()=>{}}
          className=" cursor-pointer"
           />
      </div>
    </div>
  )
}

export default PostStats