import { Models } from "appwrite";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Button } from "../button";

interface ProfileTabsProps {
  posts: any;
}

const ProfileTabs = ({ posts }: ProfileTabsProps) => {
  return (
    <div className=" flex flex-col w-full max-w-5xl">
    <div className="flex justify-between w-full ">
      {/* Tabs */}
      <div>
        <Tabs defaultValue="posts" className="w-[400px]">
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
          {/* <TabsContent value="posts">
          
            <div>
              {posts.map((post: Models.Document, index: number) => (
                <div key={index} className="mb-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                
                    </CardContent>
                    <CardFooter>
                      <Button>{post.$id}</Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent> */}
      </Tabs>
      </div>

      <div className="flex items-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
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
