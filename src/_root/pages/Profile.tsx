import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import ProfileTabs from "../../components/ui/shared/ProfileTabs";
import { useUserContext } from "../../context/AuthContext";
import { useGetCurrentUser, useGetUserPosts } from "../../lib/react-query/queriesAndMutations";



const Profile = () => {

  const {user}= useUserContext();
  const{data:currentUser}= useGetCurrentUser();
  const {data:posts}= useGetUserPosts(user.id, "posts");

  
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="w-full flex justify-start items-center gap-6 max-w-5xl">
          {/* Profile Image */}
          <img
            src="/assets/images/profile.png"
            alt="user-profile-image"
            height={150}
            width={150}
            className="rounded-full self-start py-6 object-cover"
          />

          <div className="flex flex-col py-6">
            <div className="flex gap-14 items-center">
              <h2 className="md:h1-semibold h2-bold">Lewis Hamilton</h2>
              {currentUser?.$id === user.id ? (
                <Link to={`/update-profile/${user.id}`}>
                 <Button className="bg-dark-3 py-3 px-5 text-light-2 font-semibold text-lg flex items-center">
                 <img
                   src="/assets/icons/edit-yellow.svg"
                   width={15}
                   height={15}
                   alt="edit-icon"
                   className="mr-2 fill-current text-yellow-400"
                 />
                 Edit Profile
               </Button>
                </Link>
              ):(
                <div className=" flex gap-3">
                  <Button
                   className=" bg-primary-500 py-3 px-5 text-white text-lg font-semibold"
                  >
                    Follow
                  </Button>
                  <Button
                   className=" bg-white py-3 px-5 text-black text-lg font-semibold"
                  >
                    Message
                  </Button>
                </div>
              )
              
              }
             
            </div>
            <p className="text-xl text-light-3">@Lewishamilton</p>
            <div className="flex w-[60%] justify-between mt-3">
              <div className="flex flex-col gap-1">
                <h1 className="text-primary-500 font-medium text-lg">273</h1>
                <p>Posts</p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-primary-500 font-medium text-lg">147</h1>
                <p>Followers</p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-primary-500 font-medium text-lg">151</h1>
                <p>Following</p>
              </div>
            </div>
            <div className="mt-5">
              <p className="flex items-center space-x-2">
                <span>🌿</span>
                <span>Capturing the essence of nature through my lens</span>
              </p>
              <p className="flex items-center space-x-2 mt-2">
                <span>✨</span>
                <span>
                  "In every walk with nature, one receives far more than he
                  seeks." - John Muir
                </span>
              </p>
            </div>
            <div className=" mt-5 flex gap-8 ">
              <div className=" flex flex-col gap-2">
                  <img 
                  className="  rounded-full border-[3px] border-light-3"
                  src="/assets/images/profile.png" 
                  alt="" 
                  width={72}
                  height={72}
                  />
                  <p className="text-center text-sm font-semibold">BTS</p>
               </div>
               <div className=" flex flex-col gap-2">
                <img 
                className="  rounded-full border-[3px] border-light-3"
                src="/assets/images/profile.png" 
                alt="" 
                width={72}
                height={72}
                />
                <p className="text-center text-sm font-semibold">Frisbee</p>
               </div>
               <div className=" flex flex-col gap-2">
                <img 
                className="  rounded-full border-[3px] border-light-3"
                src="/assets/images/profile.png" 
                alt="" 
                width={72}
                height={72}
                />
                <p className="text-center text-sm font-semibold">Nature</p>
               </div>
               <div className=" flex flex-col gap-2 ">
                <img 
                className="rounded-full border-[3px] border-light-3"
                src="/assets/images/profile.png" 
                alt="" 
                width={72}
                height={72}
                />
                <p className=" text-center text-sm font-semibold">Outdoor</p>
              </div> 
            </div>
          </div>
        </div>

        {/* Tabs for the Posts,reels,and tagged */}
        

        <ProfileTabs userId={user.id}/>
     
      </div>
    </div>
  );
};

export default Profile;
