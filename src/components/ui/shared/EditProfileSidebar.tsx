import { useUserContext } from "../../../context/AuthContext"
import {useGetUserTopPosts } from "../../../lib/react-query/queriesAndMutations"
import EditProfileSidebarPosts from "./EditProfileSIdebarPosts"
import Loader from "./Loader";

const EditProfileSidebar = () => {

  const {user}=useUserContext();
  const {data:posts,isLoading:isPostsLoading}= useGetUserTopPosts(user.id);
  
  return (
  <div className=" min-w-[420px] h-full border-l-2 border-dark-4  justify-center py-8  px-12">
    <div className=" flex flex-col gap-9">
      <div className=" flex flex-col gap-3 items-center">
        <img 
         src="/assets/images/profile.png" 
         alt="profile"
         width={130}
         height={130}
         className=" rounded-full placeholder:object-cover"
         />

         <h2 className=" h2-bold md:h3-bold">Lewis Hamilton</h2>
         <p className=" font-normal text-[18px] text-light-3 text-center">@Lewishamilton</p>
       </div>

       <div className=" flex flex-col gap-3 items-center">
        <h3 className="font-semibold text-[24px] self-start">Top posts by you</h3>

        {/* Posts */}
        {isPostsLoading ? (
          <div className=" mt-6">
          <Loader/>
          </div>
        ):<EditProfileSidebarPosts posts={posts}/>}
        
       </div>
      </div>
    </div>
  )
}

export default EditProfileSidebar