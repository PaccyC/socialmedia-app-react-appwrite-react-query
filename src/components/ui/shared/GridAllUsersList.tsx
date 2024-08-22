import { Models } from "appwrite"
import { Link } from "react-router-dom"
import { Button } from "../button"


interface GridAllUsersListProps{

    users: any
}
const GridAllUsersList = ({users}:GridAllUsersListProps) => {
  return (
    <div className=" w-full gap-7 grid grid-cols-3">
        {users.documents.map((user:Models.Document)=>(
        <Link to={`/profile/${user.$id}`} className=" min-w-[303px] h-[319px] rounded-2xl border  border-[3px]  border-dark-4 cursor-pointer">
          <div className=" flex flex-col items-center py-12 px-6">
            <img 
            src={user.imageUrl} 
            alt="user-image"
            height={54}
            width={54}
            className=" rounded-full mb-3" />
          
          <div className=" flex flex-col gap-1">
          <p className=" h3-bold font-semibold">{user.name}</p>
          <p className=" body-medium text-light-3 text-center ">@{user.username}</p>
          </div>
          <Button className=" px-6 py-3 bg-primary-500 text-white mt-4 rounded-lg">
            Follow
          </Button>
          </div>
        </Link >
        ))}
    
        
        
    </div>
  )
}

export default GridAllUsersList