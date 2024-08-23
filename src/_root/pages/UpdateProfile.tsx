import EditProfileForm from "../../components/forms/EditProfileForm"

const UpdateProfile = () => {
  return (
    <div className=" flex flex-1">
      <div className="common-container">
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
            
        {/* Profile image */}

         <div className=" flex gap-3 items-center">
          <img 
              src="/assets/images/profile.png" 
              alt="profile"
              width={100}
              height={100}
          />
          <p className=" text-[#0095F6] font-semibold text-[18px]">Change profile photo</p>
        </div>
          </div>
          </div>
        {/* Edit Profile Form */}
          <EditProfileForm/>
        </div>

      </div>
  )
}

export default UpdateProfile