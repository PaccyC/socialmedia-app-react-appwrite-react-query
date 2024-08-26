import GridAllUsersList from "../../components/ui/shared/GridAllUsersList";
import { useGetUsers } from "../../lib/react-query/queriesAndMutations";



const AllUsers = () => {
  const {data:users}= useGetUsers();
  console.log(users);
  
  return (
    <div className=" flex flex-1">
      <div className="common-container">
        <div className=" w-full flex-start gap-3 max-w-5xl">
          <div className=" flex flex-col gap-8">
            <div className=" flex gap-3">
              <img 
              className="invert brightness-0 transition"
              src="/assets/icons/people.svg" 
              alt="people"
              width={36}
              height={36}
              />
              <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
            </div> 
             <GridAllUsersList users={users?.documents}/>
          </div>  
        </div>
      </div>
  </div> 
  )
}

export default AllUsers