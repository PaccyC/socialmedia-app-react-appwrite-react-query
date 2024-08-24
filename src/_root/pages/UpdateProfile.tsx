import EditProfileForm from "../../components/forms/EditProfileForm"
import EditProfileSidebar from "../../components/ui/shared/EditProfileSidebar"
import { useGetCurrentUser } from "../../lib/react-query/queriesAndMutations";

const UpdateProfile = () => {

  const {data:user}= useGetCurrentUser();
  
  console.log(user);
  
  return (
    <div className=" flex flex-1 ">
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14 ">
        <div className=" max-w-5xl flex-start gap-3  w-full  py-6">
           <div className=" flex flex-col gap-12 ">
            <div className="flex gap-3">
              <img 
                src="/assets/icons/edit-white.svg" 
                alt="edit-profile"
                width={36}
                height={36}
                />
                <h2 className=" h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
            </div>
          </div>
          </div>

        {/* Edit Profile Form */}
          <EditProfileForm user={user}/>
        </div>
        <EditProfileSidebar/>

      </div>
  )
}

export default UpdateProfile