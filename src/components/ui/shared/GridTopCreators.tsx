import { Models } from "appwrite"
import { Link } from "react-router-dom"
import { Button } from "../button"


interface GridTopCreatorsListProps{

    users: any
}
const GridTopCreatorsList = ({users}:GridTopCreatorsListProps) => {
  return (
    <div className=" w-full gap-7 grid grid-cols-2 overflow-scroll custom-scrollbar">
        {users.documents.map((user:Models.Document)=>(
        <Link to={`users/${user.$id}`} className=" min-w-[190px] h-[190px] rounded-lg border border-light-4 cursor-pointer">
          <div className=" flex flex-col   items-center py-4 px-6">
            <img 
            src={user.imageUrl} 
            alt="user-image"
            height={54}
            width={54}
            className=" rounded-full mb-3" />
          
          <p className=" font-semibold">{user.name}</p>
          <p className=" tiny-medium text-light-3 text-center ">followed by paccy</p>
          
          <Button className=" px-5 py-2 bg-primary-500 text-white mt-2 rounded-lg">
            Follow
          </Button>
          </div>
        </Link >
        ))}
    
        
        
    </div>
  )
}

export default GridTopCreatorsList