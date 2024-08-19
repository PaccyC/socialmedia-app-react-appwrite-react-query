import { Models } from "appwrite";
import Loader from "../../components/ui/shared/Loader";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";

const Home = () => {
  
  
  const {data:posts,isPending:isPostLoading,isError}= useGetRecentPosts();
  console.log(posts,isPostLoading);
  
  return (
    <div className="flex flex-1 ">
      <div className=" flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className=" max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
           <h2 className=" h3-bold md:h2-bold text-left w-full">Home Feed</h2>

           {isPostLoading && !posts ?
             (<Loader/>):(
              <ul className=" flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post:Models.Document)=>(
                <li key={post.$id}>{post.caption}</li>
              ))}
              
              </ul>
             )}
        </div>
      </div>
    </div>
  )
}

export default Home