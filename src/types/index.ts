import React from "react";

export type NewUser={
    name: string;
    email: string;
    password: string;
    username?: string
}

export type IContextType ={
    user:User;
    isLoading:boolean;
    setUser:React.Dispatch<React.SetStateAction<User>>;
    isAuthenticated:boolean;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: ()=> Promise<boolean>;
}

export type User={
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
}