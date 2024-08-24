import { Models } from "appwrite"


interface EditProfileSidebarProps{
    posts?:Models.Document[]
}

const EditProfileSidebarPosts = ({posts}:EditProfileSidebarProps) => {
 
    
  return (
    <div className=" grid grid-cols-1 gap-4">
        {posts?.map((post:Models.Document)=>(

      <div className=" relative min-w-[330px] h-[315px] bg-slate-600 text-black rounded-2xl ">
      <img 
        src={post.image} 
        alt="post image"
        className=" w-full h-full object-cover rounded-2xl" />
      <div className=" absolute top-0 right-0 p-5">
        <img 
        src="/assets/icons/carousel.svg" 
        alt="carousel"
        height={24}
        width={24}
        />
      </div>
      </div>
         ))}

      

    </div>
  )
}

export default EditProfileSidebarPosts