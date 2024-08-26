import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useGetUserPosts } from "../../lib/react-query/queriesAndMutations";
import ProfileTabs from "../../components/ui/shared/ProfileTabs";
import { useUserContext } from "../../context/AuthContext";


const Saved = () => {

  const {user}= useUserContext();
  

  return (
    <div className=" flex flex-1">
      <div className=" common-container">

        <div className=" w-full flex-start flex-col max-w-5xl justify-start gap-3">
          <div className=" flex gap-3 w-full">
           
            <img 
              src="/assets/icons/save.svg" 
              alt="saved"
              className=" invert brightness-0 transition"
              width={36}
              height={36}
            />
            <h2 className=" h3-bold md:h2-bold  text-left w-full">Saved Posts</h2>
          </div>
        

          <div className="flex flex-col w-full max-w-5xl">
   <ProfileTabs userId={user.id}/>
    </div>


        </div>
        
      </div>
    </div>
  )
}


export default Saved;
