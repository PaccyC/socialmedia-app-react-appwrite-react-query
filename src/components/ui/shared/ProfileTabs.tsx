import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Button } from "../button";

import { useState } from "react";
import { useGetUserPosts } from "../../../lib/react-query/queriesAndMutations";

interface ProfileTabsProps {
  userId: string;
}

const ProfileTabs = ({ userId }: ProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState("posts");
  const { data: posts, isLoading } = useGetUserPosts(userId, activeTab);
  console.log(posts);
  

  return (
    <div className="flex flex-col w-full max-w-5xl">
      <div className="flex justify-between w-full">
        {/* Tabs */}
        <Tabs
          defaultValue="posts"
          className="w-[400px]"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid grid-cols-3 bg-dark-2">
            <TabsTrigger value="posts" className="bg-dark-3">
              <img
                src="/assets/icons/posts.svg"
                alt="posts"
                className="mr-2"
                width={17}
                height={17}
              />
              Posts
            </TabsTrigger>
            <TabsTrigger value="reels">
              <img
                src="/assets/icons/reels.svg"
                alt="reels"
                className="mr-2"
                width={17}
                height={17}
              />
              Reels
            </TabsTrigger>
            <TabsTrigger value="tagged">
              <img
                src="/assets/icons/tagged.svg"
                alt="tagged"
                className="mr-2"
                width={17}
                height={17}
              />
              Tagged
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                posts?.documents.map((post: any, index: number) => (
                  <div key={index} className="mb-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img src={post.image} alt={post.caption} />
                      </CardContent>
                      <CardFooter>
                       
                      </CardFooter>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
         <TabsContent value="reels">
            <div>
            
              <p>Reels content goes here...</p>
            </div>
          </TabsContent>
          <TabsContent value="tagged">
            <div>
              
              <p>Tagged content goes here...</p>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex items-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer h-[40px]">
          <p className="small-medium lg:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            height={20}
            width={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
