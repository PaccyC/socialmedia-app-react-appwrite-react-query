import { ID, Models, Query } from "appwrite";
import { NewPost, NewUser, UpdatePost, UpdateUser, UserProfileResponse } from "../../types";
import { account, appWriteConfig, avatars, client, databases, storage } from "./config";

export async function createUserAccount(user:NewUser){
     
    try {
        
        const newAccount= await account.create(
            ID.unique(),
            user.email,
          user.password,
         user.name,
         )
         

         if(!newAccount) throw Error
         const avatarUrl= avatars.getInitials(user.name)
      
         const newUser= await saveUserToDb({
            accountId:newAccount.$id,
            name:newAccount.name,
            email:newAccount.email,
            username:user.username,
            imageUrl:avatarUrl
         })
         return newUser
    } catch (error) {
     console.log(error);
     return error;
        
    }
}

export async function saveUserToDb(user:{
    accountId:string,
    name:string,
    email:string,
    username?:string,
    imageUrl:URL
}){

    try {
        const newuser= await databases.createDocument(appWriteConfig.databaseId,
                                       appWriteConfig.usersCollectionId,
                                       ID.unique(),
                                       user)
                                       return newuser;
        
    } catch (error) {
      console.log(error);
         
    }
}

export async function signInUser(user:{email:string, password:string}){

    try {
        
        const session= await account.createEmailPasswordSession(user.email,user.password);
        if (!session) {
            throw new Error("Session creation failed");
        }
        return session;
    } catch (error) {
        console.log(error);
        
    }
}

export async function getCurrentUser (){
    try {
        
        const currentAccount= await account.get();
        if(!currentAccount) {
            console.log("Account not found");
            
            throw new Error("No active session found")
        
        }
        const currentUser= await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.usersCollectionId,
            [
                Query.equal("accountId",currentAccount.$id)
            ]
        )
        if(!currentUser) throw Error
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        
    }
}

export async function signOutAccount(){
    try {
        
        const session= await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
        
    }
}


export  const createPost = async(post:NewPost)=>{

    try {

       const uploadedFile= await uploadFile(post.file[0])
       if(!uploadedFile)throw Error;

       const fileUrl = getFilePreview(uploadedFile.$id);
       if(!fileUrl){
        await deleteFile(uploadedFile.$id);
        throw Error;
    }
    // Converting tags into an array
    const tags= post?.tags?.replace("/ /g","").split(",") || [];

    const user= await getCurrentUser();
    
    const newPost = await databases.createDocument(appWriteConfig.databaseId,
        appWriteConfig.postsCollectionId,
        ID.unique(),
        {
            creator:user?.$id,
            caption: post.caption,
            image: fileUrl,
            imageId: uploadedFile.$id,
            location: post.location,
            tags: tags,
        }


    )
    if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;


        
    } catch (error) {
        console.log(error);
        
    }


}
export const uploadFile= async (file:File)=>{
    try {
        const uploadedFile = await storage.createFile(
            appWriteConfig.storageId,
            ID.unique(),
            file
        )
        return uploadedFile;
    } catch (error) {
        console.log(error);
        
    }
}

export const getFilePreview = (fieldId:string)=>{
    try {
        const fileUrl= storage.getFilePreview(
            appWriteConfig.storageId,
             fieldId,
             2000,
             2000,
             "top",
             100
        )
        return fileUrl;
        
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteFile = async(fileId:string)=>{
    try {
        await storage.deleteFile(appWriteConfig.storageId,fileId)

        return {status: "ok"}
    } catch (error) {
        console.log(error);
        
    }
}

export const getRecentPosts = async()=>{

    try {

        const recentPosts=  await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postsCollectionId,
            [Query.orderDesc("$createdAt"),Query.limit(20)]

        )
        if(!recentPosts)throw Error;
            return recentPosts;
        
        
    } catch (error) {
        console.log( error);
        
    }
}

export async  function likePost(postId:string,likesArray:string[]){
    try {
        
        const updatedPost= await databases.updateDocument(
            appWriteConfig.databaseId,
            appWriteConfig.postsCollectionId,
            postId,
            {
                likes: likesArray
            }
        )

        if(!updatedPost) throw Error;
        return updatedPost;
    } catch (error) {
        console.log(error);
        
    }
}

export async  function savePost(postId:string,userId:string){
    try {
        
        const newPostSave= await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.savesCollectionId,
            ID.unique(),
            {
               user:userId,
               post:postId
            }
           
        )

        if(!newPostSave) throw Error;
        return newPostSave;
    } catch (error) {
        console.log(error);
        
    }
}
export async  function deleteSavedPost(savedRecorId:string){
    try {
        
    await databases.deleteDocument(
            appWriteConfig.databaseId,
            appWriteConfig.savesCollectionId,
            savedRecorId
           
           
        )

    
    } catch (error) {
        console.log(error);
        
    }
}

export async function getPostById(postId:string){
    try {
        
        const post = await databases.getDocument(
            appWriteConfig.databaseId,
            appWriteConfig.postsCollectionId,
            postId
        )
        return post;
    } catch (error) {
        console.log(error);
        
    }
}

// Editing a post


export  const editPost = async(post:UpdatePost)=>{

    const hasFileToUpdate= post.file.length > 0;
    try {

        let image = {
            imageUrl:post.image,
            imageId:post.imageId,
        }

        if(hasFileToUpdate){

            const uploadedFile= await uploadFile(post.file[0])
            if(!uploadedFile)throw Error;
     
            const fileUrl = getFilePreview(uploadedFile.$id);
            if(!fileUrl){
             await deleteFile(uploadedFile.$id);
             throw Error;
         }
         image = {...image,imageUrl:fileUrl,imageId:uploadedFile.$id}

        }

    // Converting tags into an array
    const tags= post?.tags?.replace("/ /g","").split(",") || [];

    
    const updatedPost = await databases.updateDocument(
        appWriteConfig.databaseId,
        appWriteConfig.postsCollectionId,
        post.postId,
        {
          
            caption: post.caption,
            image: image.imageUrl,
            imageId: image.imageId,
            location: post.location,
            tags: tags,
        }


    )
    if (!updatedPost) {
        await deleteFile(post.imageId);
        throw Error;
      }
  
      return updatedPost;;


        
    } catch (error) {
        console.log(error);
        
    }


}

export const deletePost = async(postId:string,imageId:string)=>{


    if(!postId || imageId) throw Error;

    try {
        
        await databases.deleteDocument(
            appWriteConfig.databaseId,
            appWriteConfig.postsCollectionId,
            postId
        )

        return {status: "ok"};
    } catch (error) {
        console.log(error);
        
    }
}

// fetching posts for expolore page

export async function getInfinitePosts({pageParam}:{pageParam:number}){

    const queries: any[] = [Query.orderDesc("$updatedAt"),Query.limit(10)]

    if(pageParam){
        queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
        
        const posts= await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postsCollectionId,
            queries
        )

        if(!posts) throw Error;
        return posts;
    } catch (error) {
        console.log(error);
        
    }
}

export async function searchPosts(searchTerm:string){

    try {
        
        const posts= await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postsCollectionId,
            [Query.search("caption",searchTerm)]
        )

        if(!posts) throw Error;
        return posts;
    } catch (error) {
        console.log(error);
        
    }
}

export async function getUsers(){
    try {
        
        const users= await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.usersCollectionId,
            [Query.orderDesc("$createdAt"),Query.limit(10)]
            
        )
        if(!users) throw Error;
        return users;
    } catch (error) {
        console.log(error);
        
    }
}

export async function getUserPosts(userId:string,type:string){

    try {
        
        const posts= await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postsCollectionId,
            [Query.equal("creator",userId),Query.orderDesc("$createdAt")]
        )

        if(!posts) throw Error;
        return posts;
    } catch (error) {
        console.log(error);
        
    }
}
export const getUserProfile = async (userId: string): Promise<UserProfileResponse | null> => {
    try {
        const response = await databases.getDocument(
            appWriteConfig.databaseId,
            appWriteConfig.usersCollectionId,
            userId
        );

        return {
            userId: response.$id,
            username: response.username,
            name: response.name,
            bio: response.bio,
            imageUrl: response.imageUrl
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};

export const getUsersTopPosts = async (userId:string)=>{
    try {
        
        const posts= await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postsCollectionId,
            [Query.equal("creator",userId) ]
        )
        if (!posts) throw new Error("No posts found");

        const sortedPosts= posts.documents.sort((a:any,b:any)=> b.likes.length - a.likes.length);


        return sortedPosts.slice(0,3);
    } catch (error) {
        console.log(error);
        
    }
}


export const updateUser = async (user:UpdateUser)=>{
  
        
        const hasFileToUpdate= user.file.length > 0;
        try {
    
            let image = {
                imageUrl:user.imageUrl,
                imageId:user.imageId,
            }
    
            if(hasFileToUpdate){
    
                const uploadedFile= await uploadFile(user.file[0])
                if(!uploadedFile)throw Error;
         
                const fileUrl = getFilePreview(uploadedFile.$id);
                if(!fileUrl){
                 await deleteFile(uploadedFile.$id);
                 throw Error;
             }
             image = {...image,imageUrl:fileUrl,imageId:uploadedFile.$id}
    
            }

            const updatedUser= await databases.updateDocument(
                appWriteConfig.databaseId,
                appWriteConfig.usersCollectionId,
                user.userId,
                {
                    name:user.name,
                    bio:user.bio,
                    imageUrl: image.imageUrl,
                    imageId: image.imageId,
                    username: user.username
                  
                }
            )

            if(!updatedUser) throw Error;

            console.log("User is updated successfully",updatedUser);
            
            return updatedUser;
            
    
     
        
    } catch (error) {
        console.log(error);
        
    }
    }


