import { ID, Query } from "appwrite";
import { NewUser } from "../../types";
import { account, appWriteConfig, avatars, databases } from "./config";

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
        return session;
    } catch (error) {
        console.log(error);
        
    }
}

export async function getCurrentUser (){
    try {
        
        const currentAccount=await account.get();
        if(!currentAccount) throw  Error
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