

import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../ui/tabs"
 
const ProfileTabs = () => {

    
  return (
    <div className=" flex-between w-full max-w-5xl ">
   {/* Tabs */}
   <div>

   <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid  grid-cols-3 bg-dark-2">
        <TabsTrigger 
          value="posts" 
          className=" bg-dark-3">
            <img 
            src="/assets/icons/posts.svg" 
            alt="posts"
            className=" mr-2"
            width={17}
            height={17}
            />
            Posts</TabsTrigger>
        <TabsTrigger value="reels">
        <img 
            src="/assets/icons/reels.svg" 
            alt="reels"
            className=" mr-2"
            width={17}
            height={17}
            />
            Reels</TabsTrigger>
        <TabsTrigger value="tagged">
        <img 
            src="/assets/icons/tagged.svg" 
            alt="tagged"
            className=" mr-2"
            width={17}
            height={17}
            />
            Tagged</TabsTrigger>
      </TabsList>
      
    </Tabs>
   </div>
   <div className=" flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
   <p className="small-medium lg:base-medium text-light-2">All</p>
   <img 
   src="/assets/icons/filter.svg"
    alt="filter"
    height={20}
    width={20}
    />
   </div>

    </div>
  )
}

export default ProfileTabs