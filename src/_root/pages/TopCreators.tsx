import GridTopCreatorsList from "../../components/ui/shared/GridTopCreators"
import Loader from "../../components/ui/shared/Loader";
import { useGetUsers } from "../../lib/react-query/queriesAndMutations"


const TopCreators = () => {


  const {data:users,isLoading:isUserLoading,isError:isErrorLoadingCreators}= useGetUsers();

  console.log(users);
  
  
  return (
    <div className=" hidden md:flex flex-col min-w-[465px]  py-10 px-6 bg-dark-2">
     
        <h2 className=" h2-bold mb-7">Top Creators</h2>
        {isUserLoading ? (
          <div className=" flex-center ">
            <Loader/>
          </div>
        ):(

          <GridTopCreatorsList users={users}/>
        )
      }
    </div>

    
  )
}

export default TopCreators