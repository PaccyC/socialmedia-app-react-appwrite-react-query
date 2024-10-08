import { Models } from "appwrite";
import Loader from "../../components/ui/shared/Loader";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";
import PostCard from "../../components/ui/shared/PostCard";
import TopCreators from "./TopCreators";

const Home = () => {
  
  
  const {data:posts,isPending:isPostLoading}= useGetRecentPosts();

  
  return (
    <div className="flex flex-1 ">
      <div className=" flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className=" max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
           <h2 className=" h3-bold md:h2-bold text-left w-full">Home Feed</h2>

           {isPostLoading && !posts ?
             (<Loader/>):(
              <ul className=" flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post:Models.Document)=>(
                <li key={post.$id}>

                  <PostCard post={post}/>
                </li>
              ))}
              
              </ul>
             )}
        </div>
      </div>
      <TopCreators/>
    </div>
  )
}

export default Home